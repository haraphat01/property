import Link from "next/link";

const Homepage = () => {
    // component logic
    return (
        <div className="flex flex-col items-center justify-center  mt-5 text-white">
            <header className="text-4xl font-bold mb-8">Property Description Generator</header>
            <div className="headline-text">
                <p className="text-lg text-center mb-8">
                    Welcome to Property Description Generator! Easily create captivating property descriptions with just a few clicks.

                </p>
            </div>
            <p className="text-lg text-center mb-8">

                Whether you're a property developer, real estate agent, or homeowner, our app helps you generate compelling descriptions
                for your properties effortlessly.
            </p>
            <div className="mt-4 mb-5">
                <video width="320" height="240" controls preload="none">
                    <source src="/path/to/video.mp4" type="video/mp4" />
                    {/* <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    /> */}
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white text-black rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">For Property Developers</h2>
                    <p>Upload images of your properties and let our AI-powered system generate engaging descriptions that highlight the key features and selling points.</p>
                </div>


                <div className="p-4 bg-white text-black rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">For Real Estate Agents</h2>
                    <p>Save time and effort by using our app to create professional property listings with captivating descriptions, attracting more potential buyers or renters.</p>
                </div>
                <div className="p-4 bg-white text-black rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">For Homeowners</h2>
                    <p>Showcase your property in the best light by generating compelling descriptions that highlight its unique features, making it stand out in the market.</p>
                </div>
                <div className="p-4 bg-white text-black rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">For Everyone</h2>
                    <p>Whether you're listing a luxury apartment, a cozy cottage, or a commercial space, our app provides tailored descriptions to suit various property types and locations.</p>
                </div>
            </div>
            <Link href={`/login`}>
                <button className="mt-8 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">Get Started</button>
            </Link>
        </div>
    );

}
export default Homepage