export default function SolutionsHeroSection() {
  return (
    <section className='relative w-full px-4 py-6 md:pb-24'>
      <div className='mx-auto max-w-7xl'>
        <div
          className='relative overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat px-8 py-16 md:px-16 md:py-48'
          style={{
            backgroundImage: "url('/solution-banner.png')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className='absolute inset-0 bg-black/50 rounded-3xl' />

          {/* Content */}
          <div className='relative z-10 mx-auto max-w-4xl text-center'>
            <h1 className='mb-6 text-2xl lg:text-[36px] font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance'>
              Solutions for Every Role in the Live Entertainment Ecosystem
            </h1>

            <p className='mx-auto max-w-3xl text-base leading-relaxed text-[#A4A4A4] md:text-lg text-pretty'>
              Getavails isn&apos;t just a booking tool, it&apos;s a tailored
              ecosystem that adapts to your workflow. We understand that each
              role in the entertainment chain faces unique challenges.
              That&apos;s why we&apos;ve designed Getavails to meet your
              specific needs, streamline your operations, and amplify your
              impact, no matter your role.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
