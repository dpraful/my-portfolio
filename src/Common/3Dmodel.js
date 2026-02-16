import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    Environment,
    useGLTF
} from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }) {
    const { scene } = useGLTF(url);

    return (
        <primitive
            object={scene}
            scale={1.6}
            position={[0, -1, 0]}
        />
    );
}

export default function Model3D({ modelUrl }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 3, 3]} intensity={2} />

            <Suspense fallback={null}>
                <Float
                    speed={2}
                    rotationIntensity={1}
                    floatIntensity={2}
                >
                    <Model url={modelUrl} />
                </Float>

                <Environment preset="city" />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1}
            />
        </Canvas>
    );
}
