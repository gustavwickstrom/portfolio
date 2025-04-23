'use client';

export default function Footer() {
  return (
    <>
      <footer className="w-full mt-12 py-12 flex flex-col items-center text-center lg:flex-row lg:justify-between lg:items-end lg:text-left lg:gap-12">
    
        <div className="flex flex-col justify-end space-y-2 text-center lg:text-left">
          <ul className="text-headline leading-tight space-y-1">
            <li>Photographer</li>
            <li>Filmmaker</li>
            <li>Colorist</li>
          </ul>
          <p>Absolutely insane about telling stories.</p>
        </div>

        <div className="mt-8 lg:mt-0 text-center lg:text-right">
          <div>
            <p>Represented by:</p>
            <p>
              <a href="https://www.nystudio.se/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ny Studio</a> &{' '}
              <a href="https://www.saga.se/" target="_blank" rel="noopener noreferrer" className="hover:underline">Saga Production</a>
            </p>
          </div>

          <div className="mt-6">
            <p>
              <a href="tel:+46738329324" className="hover:underline">(+46) 73 832 93 24</a>
            </p>
            <p>
              <a href="mailto:gustav.wickstrom@nystudio.se" className="hover:underline">gustav.wickstrom@nystudio.se</a>
            </p>
          </div>
        </div>
      </footer>


    </>
  );
}
/*
 <div className="text-center">
 ©2024 Gustav Wickström. All rights reserved.
</div>*/