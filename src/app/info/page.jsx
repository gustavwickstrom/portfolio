import PageWrapper from '../components/PageWrapper';

export default function Info() {
  return (
        <PageWrapper>
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="space-y-8 text-base">
        
        <h1 className="text-xl font-bold">Gustav Gunnar Alexander Wickström</h1>

        <ul>
          <li className="font-bold">From:</li>
          <li className="">Kalmar, Sweden</li>
        </ul>

        <ul>
          <li className="font-bold">Based in:</li>
          <li className="">Jönköping, Sweden</li>
        </ul>

        <ul>
          <li className="font-bold">Work Experience:</li>
          <li className="">Post-production Specialist, Saga Production</li>
          <li className="">Junior Art Director, Ny Studio</li>
        </ul>

        <ul>
          <li className="font-bold">Awards & Scholarships:</li>
          <li className="">Jönköping Borgarekassa och Bjuggska fonden</li>
        </ul>

        <ul>
          <li className="font-bold">Education:</li>
          <li className="">New Media Design, Jönköping University</li>
          <li className="">Estetik och Media, Jenny Nyströmsskolan</li>
        </ul>

        <ul>
          <li className="font-bold">Interests:</li>
          <li className="">Skateboarding</li>
          <li className="">Hardcore Punk & Death Metal</li>
          <li className="">Salty licorice</li>
          <li className="">Guitar Playing</li>
        </ul>
        
        </div>
    </main>
    </PageWrapper>
  );
}
