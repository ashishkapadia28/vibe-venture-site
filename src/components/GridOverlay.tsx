export function GridOverlay() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-51">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 h-screen">
        <div className="w-full h-full relative">
          {/* Left edge */}
          <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-[2px] dashed-y" />
          {/* Right edge */}
          <div className="absolute -right-4 md:-right-8 top-0 bottom-0 w-[2px] dashed-y" />
        </div>
      </div>
    </div>
  );
}
