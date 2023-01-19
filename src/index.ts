import { Document, Primitive } from '@gltf-transform/core';
import XAtlas, { AddMeshStatus } from './xatlas/xatlas';

export const unwrap = async (document: Document, ...input: Primitive[]) => {
	const xAtlas = await XAtlas();

	const map = new Map<number, Primitive>();

	xAtlas.createAtlas();

	for (const primitive of input) {
		const indices = primitive.getIndices()?.getArray()!;
		const positions = primitive.getAttribute('POSITION')?.getArray()!;
		const normal = primitive.getAttribute('NORMAL')?.getArray()!;
		const uv = primitive.getAttribute('TEXCOORD_0')?.getArray()!;

		const meshInfo = xAtlas.createMesh(positions.length / 3, indices.length, true, true);

		xAtlas.HEAPU16.set(indices, meshInfo.indexOffset / Uint16Array.BYTES_PER_ELEMENT);
		xAtlas.HEAPF32.set(positions, meshInfo.positionOffset / Float32Array.BYTES_PER_ELEMENT);
		xAtlas.HEAPF32.set(normal, meshInfo.normalOffset / Float32Array.BYTES_PER_ELEMENT);
		xAtlas.HEAPF32.set(uv, meshInfo.uvOffset / Float32Array.BYTES_PER_ELEMENT);
		
        const status = xAtlas.addMesh();

        if(status !== AddMeshStatus.Success) {
            throw new Error(`Failed to add mesh: ${AddMeshStatus[status]}`);
        }

		map.set(meshInfo.meshId, primitive);
	}

	xAtlas.generateAtlas(xAtlas.defaultChartOptions(), xAtlas.defaultPackOptions());

	for (const meshId of map.keys()) {
		const primitive = map.get(meshId)!;

		const meshInfo = xAtlas.getMeshData(meshId);

		const original = {
			position: primitive.getAttribute('POSITION')?.getArray()!,
			normal: primitive.getAttribute('NORMAL')?.getArray()!,
			uv: primitive.getAttribute('TEXCOORD_0')?.getArray()!
		};

		const revamped = {
			index: new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.indexOffset / 4, meshInfo.indexOffset / 4 + meshInfo.newIndexCount)),
			position: new Float32Array(meshInfo.newVertexCount * 3),
			normal: new Float32Array(meshInfo.newVertexCount * 3),
			uv: new Float32Array(meshInfo.newVertexCount * 2),
			uv2: new Float32Array(xAtlas.HEAPF32.subarray(meshInfo.uvOffset / 4, meshInfo.uvOffset / 4 + meshInfo.newVertexCount * 2))
		};

		let oldIndexes = new Uint16Array(xAtlas.HEAPU32.subarray(meshInfo.originalIndexOffset / 4, meshInfo.originalIndexOffset / 4 + meshInfo.newVertexCount));

		xAtlas.destroyMeshData(meshInfo);

		for (let i = 0, l = meshInfo.newVertexCount; i < l; i++) {
			let oldIndex = oldIndexes[i];

			revamped.position[3 * i + 0] = original.position[3 * oldIndex + 0];
			revamped.position[3 * i + 1] = original.position[3 * oldIndex + 1];
			revamped.position[3 * i + 2] = original.position[3 * oldIndex + 2];

			revamped.normal[3 * i + 0] = original.normal[3 * oldIndex + 0];
			revamped.normal[3 * i + 1] = original.normal[3 * oldIndex + 1];
			revamped.normal[3 * i + 2] = original.normal[3 * oldIndex + 2];

			revamped.uv[2 * i + 0] = original.uv[2 * oldIndex + 0];
			revamped.uv[2 * i + 1] = original.uv[2 * oldIndex + 1];
		}

		const indices = primitive.getIndices();
		const positions = primitive.getAttribute('POSITION');
		const normal = primitive.getAttribute('NORMAL');
		const uv = primitive.getAttribute('TEXCOORD_0');

		indices?.setArray(revamped.index);
		positions?.setArray(revamped.position);
		normal?.setArray(revamped.normal);
		uv?.setArray(revamped.uv);

		primitive.setAttribute('TEXCOORD_1', document.createAccessor('TEXCOORD_1').setType("VEC2").setArray(revamped.uv2));
	}
};