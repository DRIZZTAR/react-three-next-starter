'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { Environment, Stars } from '@react-three/drei'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-white' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const CommonCanvas = dynamic(() => import('@/components/canvas/View').then((mod) => mod.CommonCanvas), { ssr: false })

export default function Page() {
  return (
    <div className='relative min-h-screen bg-black bg-gradient-to-b from-black via-gray-900 to-black'>
      {/* Full background 3D view */}
      <div className='fixed inset-0'>
        <View className='size-full'>
          <Suspense fallback={null}>
            {/*put scene of random sloawlyt floatin geometries colorful here*/}
            <Stars radius={200}/>
            <CommonCanvas />
          </Suspense>
        </View>
      </div>

      {/* Content overlay */}
      <div className='relative z-10'>
        <div className='mx-auto flex w-full flex-col flex-wrap items-center px-4 pt-20 md:flex-row lg:w-4/5'>
          {/* jumbo */}
          <div className='flex w-full flex-col items-start justify-center text-center md:w-2/5 md:pr-12 md:text-left'>
            <p className='w-full text-sm font-medium uppercase tracking-wider text-gray-400'>
              Next + React Three Fiber
            </p>
            <h1 className='mb-3 w-full text-5xl font-bold leading-none tracking-tight text-white'>Next 3D Starter</h1>
            <p className='mb-8 w-full text-gray-400'>A minimalist starter for React, React-three-fiber and Threejs.</p>
          </div>

          <div className='w-full text-center sm:w-3/5'>
            <View className='flex h-96 w-full flex-col items-center justify-center'>
              <Suspense fallback={null}>
                <Logo route='/blob' scale={1} position={[0, 0, 0]} />
                <Environment  preset='city' backgroundBlurriness={0.18} />
                <CommonCanvas />
              </Suspense>
            </View>
          </div>
        </div>

        <div className='mx-auto flex w-full flex-col flex-wrap items-center p-4 md:flex-row lg:w-4/5'>
          {/* first row */}
          <div className='flex w-full flex-col items-start justify-center pt-6 text-center sm:pb-12 sm:pt-0 md:w-1/2 md:pr-12 md:text-left'>
            <h2 className='mb-3 w-full text-3xl font-bold leading-none tracking-tight text-white'>
              Events are propagated
            </h2>
            <p className='mb-8 w-full text-gray-400'>
              Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.
            </p>
          </div>
          <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
            <View orbit className='relative h-full sm:h-48 sm:w-full'>
              <Suspense fallback={null}>
                <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
                <Environment background preset='forest' backgroundBlurriness={0} />
                <CommonCanvas />
              </Suspense>
            </View>
          </div>
          {/* second row */}
          <div className='relative mb-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
            <View orbit className='relative h-full sm:h-48 sm:w-full'>
              <Suspense fallback={null}>
                <Duck route='/blob' scale={2} position={[0.2, -0.9, 0.0]} />
                <Environment
                  background
                  preset='dawn'
                  backgroundBlurriness={0}
                  ground={{
                    height: -4,
                    radius: 360,
                    scale: 8,
                  }}
                />
                <CommonCanvas color={'#000000'} position={[0, 2, 5]} fov={60} />
              </Suspense>
            </View>
          </div>
          <div className='flex w-full flex-col items-start justify-center text-center md:w-1/2 md:pb-20 md:pl-12 md:text-left'>
            <h2 className='mb-3 w-full text-3xl font-bold leading-none tracking-tight text-white'>
              Dom and 3D are synchronized
            </h2>
            <p className='mb-8 text-gray-400'>
              3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
              tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you
              to have multiple views with a single, performant canvas. These views will follow their tracking elements,
              scroll along, resize, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
