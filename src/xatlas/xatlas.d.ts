declare const init: () => Promise<XAtlas>;
export default init;

type MeshId = number;

export interface MeshBufferInfo {
    meshId: MeshId;
    indexOffset: number;
	positionOffset: number;
	normalOffset: number;
	uvOffset: number;
}

export interface UvMeshBufferInfo {
    meshId: MeshId;
    indexOffset: number;
    uvOffset: number;
}

export interface AtlasMeshBufferInfo {
	newVertexCount: number;
    newIndexCount: number;
    indexOffset: number;
    originalIndexOffset: number;
    uvOffset: number;
}

export interface ArraySetter {
	set: (array: ArrayLike<number>, count: number) => void;
	buffer: ArrayBufferLike;
    subarray: (start: number, end: number) => ArrayLike<number>;
}

export interface ChartOptions {
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

export interface PackOptions {
    /** Charts larger than this will be scaled down. 0 means no limit.. */
    maxChartSize?: number,
    
    /** Number of pixels to pad charts with. **/
    padding?: number,

    /** 
     * Unit to texel scale. e.g. a 1x1 quad with texelsPerUnit of 32 will take up approximately 32x32 texels in the atlas. 
	 * If 0, an estimated value will be calculated to approximately match the given resolution.
	 * If resolution is also 0, the estimated value will approximately match a 1024x1024 atlas. 
    **/
    texelsPerUnit?: number

    /** 
     * If 0, generate a single atlas with texelsPerUnit determining the final resolution.
     * If not 0, and texelsPerUnit is not 0, generate one or more atlases with that exact resolution.
     * If not 0, and texelsPerUnit is 0, texelsPerUnit is estimated to approximately match the resolution.
    **/
    resolution?: number,

    /** Leave space around charts for texels that would be sampled by bilinear filtering. **/
    bilinear?: boolean,

    /** Align charts to 4x4 blocks. Also improves packing speed, since there are fewer possible chart locations to consider. **/
    blockAlign?: boolean,

    /** Slower, but gives the best result. If false, use random chart placement. **/
    bruteForce?: boolean,

    /** Create Atlas::image **/
    createImage?: boolean,

    /** Rotate charts to the axis of their convex hull. **/
    rotateChartsToAxis?: boolean,

    /** Rotate charts to improve packing. **/
    rotateCharts?: boolean,
}

export interface XAtlas {
    createAtlas: () => void;

    createMesh: (vertexCount: number, indexCount: number, normals: boolean, uvs: boolean) => MeshBufferInfo;
    createUvMesh: (vertexCount: number, indexCount: number) => UvMeshBufferInfo;

    addMesh: () => AddMeshStatus;
    addUvMesh: () => AddMeshStatus;

    /** Need test **/
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

