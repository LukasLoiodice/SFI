import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { GetItemContentService, UpdateItemStatusService } from "src/features/items/service";
import { useAuthStore } from "src/stores/auth";
import { ITEM_STATUS_ENUM, type ITEM_STATUS } from "src/features/items/model";
import { useNavigate } from "react-router";

export const ItemVisualisation = (props: { itemID: number }) => {
    const itemID = props.itemID

    const token = useAuthStore((res) => res.token)

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const navigate = useNavigate()

    if (!token ) {
        return
    }

    const updateStateHandler = async (status: ITEM_STATUS) => {
        UpdateItemStatusService(token, itemID, status).then(() => {
            navigate('/items')
        }).catch((error: any) => {
            console.log(error)
        })
    }

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
            <div className="min-w-full min-h-full">
                <div className="w-full flex justify-center px-4 py-2 bg-gray-800">
                    <button onClick={() => { updateStateHandler(ITEM_STATUS_ENUM.invalid) }} className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md px-3 py-3 transition-colors duration-200 mx-4">
                        Refuser
                    </button>
                    <button onClick={() => { updateStateHandler(ITEM_STATUS_ENUM.valid) }} className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-md px-3 py-3 transition-colors duration-200">
                        Accepter
                    </button>
                </div>
                <canvas
                    ref={canvasRef}
                    className="min-w-full min-h-full bg-gray-200"
                />
            </div>
        </div>
    )
}