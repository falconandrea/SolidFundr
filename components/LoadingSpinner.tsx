/**
 * Renders a loading spinner component.
 *
 * @return {JSX.Element} The loading spinner component.
 */
const LoadingSpinner = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-10 bg-white">
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-t-orange-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
