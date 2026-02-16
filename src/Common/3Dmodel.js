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

    // Preload model for smoother render
    useEffect(() => {
        useGLTF.preload(url);
    }, [url]);

    return <primitive object={scene} />;
}

export default function Model3D({ modelUrl }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "visible"
            }}
        >
            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 3, 3]} intensity={2} />

                <Suspense fallback={null}>
                    {/* Auto fit model */}
                    <Bounds fit clip observe margin={1.2}>
                        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                            <Model url={modelUrl} />
                        </Float>
                    </Bounds>

                    <Environment preset="city" />
                </Suspense>

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}
