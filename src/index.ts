import { Document, Primitive, Mesh } from '@gltf-transform/core';
import XAtlas, { ChartOptions, PackOptions } from './xatlas/xatlas';

export enum AddMeshStatus {
	Success,
	Error,
	IndexOutOfRange,
	InvalidIndexCount,
}

type XAtlasOptions = {
	chartOptions: Partial<ChartOptions>,
	packOptions: Partial<PackOptions>,
	attributeName: string,
}

const DEFAULT_OPTIONS = {
	chartOptions: {},
	packOptions: {},
	attributeName: "TEXCOORD_1"
}

export const unwrap = async (document: Document, input: (Mesh | Primitive)[], options: Partial<XAtlasOptions> = {}) => {
	const xAtlas = await XAtlas();

	options = {
		...DEFAULT_OPTIONS,
		...options,
	};

	const primitives = [];

	for (const item of input) {
		if (item instanceof Mesh) {
			primitives.push(...item.listPrimitives());
		}
		else {
			primitives.push(item);
		}
	}

	const map = new Map<number, Primitive>();

	xAtlas.createAtlas();

	for (const primitive of primitives) {
		const indices = primitive.getIndices()?.getArray()!;
		const positions = primitive.getAttribute('POSITION')?.getArray()!;

		const meshInfo = xAtlas.createMesh(positions.length / 3, indices.length, false, false);

		xAtlas.HEAPU16.set(indices, meshInfo.indexOffset / Uint16Array.BYTES_PER_ELEMENT);
		xAtlas.HEAPF32.set(positions, meshInfo.positionOffset / Float32Array.BYTES_PER_ELEMENT);
		
        const status = xAtlas.addMesh();

        if(status !== AddMeshStatus.Success) {
            throw new Error(`Failed to add mesh: ${AddMeshStatus[status]}`);
        }

		map.set(meshInfo.meshId, primitive);
	}

	xAtlas.generateAtlas({
		...xAtlas.defaultChartOptions(),
		...options.chartOptions,
	}, {
		...xAtlas.defaultPackOptions(),
		...options.packOptions,
	});

	for (const meshId of map.keys()) {
		const primitive = map.get(meshId)!;

		const meshInfo = xAtlas.getMeshData(meshId);

		let originalIndexData = new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.originalIndexOffset / 4, meshInfo.originalIndexOffset / 4 + meshInfo.newVertexCount));

		xAtlas.destroyMeshData(meshInfo);

		for(var semantics of primitive.listSemantics()) {
			const attribute = primitive.getAttribute(semantics);
			const elementSize = attribute.getElementSize();

			const oldArray = attribute.getArray();
			const newArray = new Float32Array(meshInfo.newVertexCount * attribute.getElementSize());

			for (let i = 0, l = meshInfo.newVertexCount; i < l; i++) {
				let originalIndex = originalIndexData[i];
				
				for (let index = 0; index < attribute.getElementSize(); index++) {
					newArray[elementSize * i + index] = oldArray[elementSize * originalIndex + index];
				}
			}

			attribute.setArray(newArray);
		}

		const indices = primitive.getIndices();
		indices?.setArray(new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.indexOffset / 4, meshInfo.indexOffset / 4 + meshInfo.newIndexCount)));

		const uv2 = document.createAccessor(options.attributeName).setType("VEC2").setArray(new Float32Array(xAtlas.HEAPF32.subarray(meshInfo.uvOffset / 4, meshInfo.uvOffset / 4 + meshInfo.newVertexCount * 2)));
		primitive.setAttribute(options.attributeName, uv2);
	}
};