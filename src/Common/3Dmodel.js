import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    Environment,
    useGLTF,
    Bounds
} from "@react-three/drei";
import { Suspense, useEffect } from "react";

function Model({ url }) {
    const { scene } = useGLTF(url);

    useEffect(() => {
        useGLTF.preload(url);
    }, [url]);

    return <primitive object={scene} />;
}

export default function Model3D({ Data }) {
    console.log("Config:", Data);

    if (!Data) return null;

    return (
        <Canvas camera={Data.camera}>
            {/* Lights */}
            {Data.lights?.ambient?.enabled && (
                <ambientLight intensity={Data.lights.ambient.intensity} />
            )}

            {Data.lights?.directional?.enabled && (
                <directionalLight
                    position={Data.lights.directional.position}
                    intensity={Data.lights.directional.intensity}
                />
            )}

            <Suspense fallback={null}>
                {Data.bounds?.enabled ? (
                    <Bounds
                        fit={Data.bounds.fit}
                        clip={Data.bounds.clip}
                        observe={Data.bounds.observe}
                        margin={Data.bounds.margin}
                    >
                        {Data.float?.enabled ? (
                            <Float
                                speed={Data.float.speed}
                                rotationIntensity={Data.float.rotationIntensity}
                                floatIntensity={Data.float.floatIntensity}
                            >
                                <Model url={Data.model.url} />
                            </Float>
                        ) : (
                            <Model url={Data.model.url} />
                        )}
                    </Bounds>
                ) : (
                    <Model url={Data.model.url} />
                )}

                {Data.environment?.enabled && (
                    <Environment preset={Data.environment.preset} />
                )}
            </Suspense>

            {Data.orbitControls?.enabled && (
                <OrbitControls
                    target={Data.orbitControls.target}
                    enablePan={Data.orbitControls.enablePan}
                    maxPolarAngle={Data.orbitControls.maxPolarAngle}
                    minPolarAngle={Data.orbitControls.minPolarAngle}
                />
            )}
        </Canvas>
    );
}
