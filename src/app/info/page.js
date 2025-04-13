import PageWrapper from '../components/PageWrapper';

export default function Info() {
  return (
        <PageWrapper>
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="space-y-8 text-base">
        
        <h1 className="text-xl font-bold">Gustav Gunnar Alexander Wickström</h1>

        <ul>
          <li className="font-bold">From:</li>
          <li className="font-thin">Kalmar, Sweden</li>
        </ul>

        <ul>
          <li className="font-bold">Based in:</li>
          <li className="font-thin">Jönköping, Sweden</li>
        </ul>

        <ul>
          <li className="font-bold">Work Experience:</li>
          <li className="font-thin">Post-production Specialist, Saga Production</li>
          <li className="font-thin">Junior Art Director, Ny Studio</li>
        </ul>

        <ul>
          <li className="font-bold">Awards & Scholarships:</li>
          <li className="font-thin">Jönköping Borgarekassa och Bjuggska fonden</li>
        </ul>

        <ul>
          <li className="font-bold">Education:</li>
          <li className="font-thin">New Media Design, Jönköping University</li>
          <li className="font-thin">Estetik och Media, Jenny Nyströmsskolan</li>
        </ul>

        <ul>
          <li className="font-bold">Interests:</li>
          <li className="font-thin">Skateboarding</li>
          <li className="font-thin">Hardcore Punk & Death Metal</li>
          <li className="font-thin">Salty licorice</li>
          <li className="font-thin">Guitar Playing</li>
        </ul>
        
        </div>
    </main>
    </PageWrapper>
  );
}
