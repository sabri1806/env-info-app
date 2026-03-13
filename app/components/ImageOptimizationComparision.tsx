
import Image from 'next/image';

export default function ImageOptimizationComparision() {

    return (
        <div className='max-w-5xl mx-auto py-12'>
            <h1 className='text-3xl font-bold mb-10 text-center'>Next js | Image Optimization Comparision </h1>

            <div className="bg-blue-900/40 border font-semibold border-blue-500 rounded-lg p-4 mb-8 text-sm">
                💡 <strong>Tip:</strong> Open your browser DevTools → Network tab and compare
                the image requests.
                <br />
                The standard <code>&lt;img&gt;</code> downloads the original file, while the
                Next.js <code>Image</code> component serves an optimized version via
                <code>/_next/image</code>.
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className='bg-gray-100 rounded-xl p-6 shadow'>
                    <h2 className='text-xl font-semibold mb-4 text-gray-700 text-center'>Standard HTML Image </h2>
                    <div className='flex justify-center mb-4'>
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="mountains.jpg"
                            width={400}
                            height={400}
                            alt="standard image"
                            className="rounded-md mb-4" />
                    </div>

                    <ul className="text-sm font-semibold text-gray-400 space-y-1">
                        <li>• Full image downloaded</li>
                        <li>• No automatic resizing</li>
                        <li>• No modern formats</li>
                        <li>• No lazy loading</li>
                    </ul>
                </div>

                {/* Optimized Image */}
                <div className='bg-gray-100 rounded-xl p-6 shadow '>
                    {/* priority improves Largest Contentful Paint (LCP)*/}
                    <h2 className='text-xl font-semibold mb-4 text-gray-700 text-center'>Next js Optimized Image</h2>
                    <div className='flex justify-center mb-4'>
                        <Image
                            src="/mountains.jpg"
                            width={400}
                            height={300}
                            alt="optimized image"
                            priority
                            className="rounded-md mb-4"
                        />
                    </div>

                    <ul className="text-sm font-semibold text-gray-400 space-y-1">
                        <li>• Automatic resizing</li>
                        <li>• WebP / AVIF support</li>
                        <li>• Lazy loading</li>
                        <li>• CDN caching on Vercel</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}