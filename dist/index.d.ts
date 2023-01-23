import { Document, Mesh, Primitive } from '@gltf-transform/core';

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

declare enum AddMeshStatus {
    Success = 0,
    Error = 1,
    IndexOutOfRange = 2,
    InvalidIndexCount = 3
}
declare type XAtlasOptions = {
    chartOptions: Partial<ChartOptions>;
    packOptions: Partial<PackOptions>;
    attributeName: string;
};
declare const unwrap: (document: Document, input: (Mesh | Primitive)[], options?: Partial<XAtlasOptions>) => Promise<void>;

export { AddMeshStatus, unwrap };
