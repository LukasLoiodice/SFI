import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { GetItemContentService } from "../service";
import { useAuthStore } from "src/stores/auth";

export const ItemVisualisation = (props: { itemID: number }) => {
    const itemID = props.itemID

    const token = useAuthStore((res) => res.token)

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [isLoading, setIsLoading] = useState<Boolean>(true)

    useEffect(() => {
        if (!token) return
        GetItemContentService(token, itemID).then((res) => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current

            // Scene
            const scene = new THREE.Scene()
            scene.background = new THREE.Color(0xf0f0f0)

            // Camera
            const camera = new THREE.PerspectiveCamera(
                60,
                canvas.clientWidth / canvas.clientHeight,
                0.1,
                1000
            )
            camera.position.set(0, 2, 5)

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true
            })
            renderer.setSize(canvas.clientWidth, canvas.clientHeight)
            renderer.setPixelRatio(window.devicePixelRatio)

            // Lights
            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1)
            hemiLight.position.set(0, 20, 20)
            scene.add(hemiLight)

            const dirLight = new THREE.DirectionalLight(0xffffff, 1)
            dirLight.position.set(5, 10, 7.5)
            scene.add(dirLight)

            // Controls
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true

            // Load object
            const loader = new GLTFLoader()

            const loadModel = async () => {
                try {
                    loader.parse(res, "", (gltf) => {
                        const model = gltf.scene
                        scene.add(model)

                        // Center the object on the origin
                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        model.position.x -= center.x;
                        model.position.y -= center.y;
                        model.position.z -= center.z;

                        setIsLoading(false)
                    })

                } catch (error: any) {
                    console.log(error)
                }

            }

            loadModel()

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate)
                controls.update()
                renderer.render(scene, camera)
            }
            animate()

            // Resize handler
            const handleResize = () => {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize)
                renderer.dispose()
            }
        })
    }, [itemID])

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="h-12 w-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full min-h-full bg-gray-200"
            />
        </div>
    )
}