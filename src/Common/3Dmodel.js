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

export default function Model3D({ modelUrl }) {
    return (
        <div style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <Canvas
                camera={{
                    position: [0, 5, 0],
                    fov: 50
                }}
            >
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 3, 3]} intensity={2} />

                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={2}>
                        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                            <Model url={modelUrl} />
                        </Float>
                    </Bounds>

                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    target={[0, 0, 0]}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={0}
                />
            </Canvas>
        </div>
    );
}
