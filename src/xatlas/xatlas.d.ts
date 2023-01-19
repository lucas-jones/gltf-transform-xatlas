declare const init: () => Promise<XAtlas>;
export default init;

type MeshId = number;

interface MeshBufferInfo {
    meshId: MeshId;
    indexOffset: number;
	positionOffset: number;
	normalOffset: number;
	uvOffset: number;
}

interface UvMeshBufferInfo {
    meshId: MeshId;
    indexOffset: number;
    uvOffset: number;
}

interface AtlasMeshBufferInfo {
	newVertexCount: number;
    newIndexCount: number;
    indexOffset: number;
    originalIndexOffset: number;
    uvOffset: number;
}

interface ArraySetter {
	set: (array: ArrayLike<number>, count: number) => void;
	buffer: ArrayBufferLike;
    subarray: (start: number, end: number) => ArrayLike<number>;
}

interface ChartOptions {
    maxIterations?: number,
    straightnessWeight?: number,
    textureSeamWeight?: number,
    useInputMeshUvs?: boolean,
    maxChartArea?: number,
    normalDeviationWeight?: number,
    maxCost?: number,
    roundnessWeight?: number,
    maxBoundaryLength?: number,
    normalSeamWeight?: number,
    fixWinding?: boolean
}

interface PackOptions {
    maxChartSize?: number,
    padding?: number,
    bilinear?: boolean,
    createImage?: boolean,
    rotateCharts?: boolean,
    rotateChartsToAxis?: boolean,
    blockAlign?: boolean,
    resolution?: number,
    bruteForce?: boolean,
    texelsPerUnit?: number
}

export enum AddMeshStatus {
	Success,
	Error,
	IndexOutOfRange,
	InvalidIndexCount,
}

export interface XAtlas {
    createAtlas: () => void;

    createMesh: (vertexCount: number, indexCount: number, normals: boolean, uvs: boolean) => MeshBufferInfo;
    createUvMesh: (vertexCount: number, indexCount: number) => UvMeshBufferInfo;

    addMesh: () => AddMeshStatus;
    addUvMesh: () => AddMeshStatus;

    // Need test
	defaultChartOptions: () => ChartOptions;
    defaultPackOptions: () => PackOptions;

    computeCharts: (chartOptions: ChartOptions) => void;
    packCharts: (packOptions: PackOptions) => void;

	generateAtlas: (chartOptions: ChartOptions, packOptions: PackOptions) => void;
    
	getMeshData: (meshId: MeshId) => AtlasMeshBufferInfo;
    
    destroyMeshData: (atlasMeshBufferInfo: AtlasMeshBufferInfo) => void;
    destroyAtlas: () => void;

    setProgressLogging: (value: boolean) => void;

	HEAPU16: ArraySetter;
	HEAPF32: ArraySetter;
	HEAPU32: ArraySetter;
}

