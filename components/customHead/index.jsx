import Head from 'next/head'

const CustomHead = ({title = "AlgoSearch: Algo Problems Search Engine", desc="Discover a world of algorithmic problems effortlessly with AlgoSearch, the ultimate search engine tailored for coding enthusiasts. Developed for the prestigious Algozenith Web Dev Hackathon, AlgoSearch is the go-to platform for locating the perfect Data Structures and Algorithms (DSA) or Competitive Programming (CP) challenge. Enhance your problem-solving skills and embark on coding adventures with AlgoSearch today!"}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}

export default CustomHead