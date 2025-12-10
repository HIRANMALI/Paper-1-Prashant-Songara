import SearchBar from "./searchBar"

const Hero = () => {
  return (
    <div className='flex flex-col items-center pt-20 md:pt-36 space-y-7 px-7 bg-gradient-to-b from-gray-500'>
        <h2 className='text-4xl font-bold text-center'>Find Every Recipe</h2>
        <p className="text-xl">At one place & enjoy free recipe listing without paying anything.</p>
        <SearchBar />
    </div>
  )
}

export default Hero