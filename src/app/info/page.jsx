import PageWrapper from "../components/PageWrapper";

export default function Info() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-2 mt-10 text-left">
        <h1 className="text-6xl lg:text-9xl font-bold mb-52">
          ABSOLUTELY INSANE ABOUT TELLING STORIES.
        </h1>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-4 py-12 gap-8 text-base">
        {/* Om dig själv */}
        <div className="">
          <p className="opacity-50">ABOUT</p>
          <p>
            Gustav Wickström is a colorist and cinematographer based in Sweden,
            working across commercial, music video, and personal projects. With
            a passion for tone, texture, and light, his work often balances the
            stylized with the authentic.
          </p>

          {/* Kontaktinfo */}
          <div className="">
            <p className="opacity-50">CONTACT</p>
            <ul>
              <li>gustav.wickstrom@nystudio.se</li>
              <li>073 832 93 24</li>
            </ul>
          </div>
        </div>

        {/* Valfri extra kolumn */}
        <div className="">
          <p className="opacity-50">REPRESENTATION</p>
          <ul>
            <li>Ny Studio & Saga Production</li>
            <li>Skolgatan 18</li>
            <li>55318, Jönköping</li>
            <li>Sweden</li>
          </ul>
        </div>

        {/* Clients */}
        <div className="">
          <p className="opacity-50">CLIENTS WORKED WITH</p>
          <p>Husqvarna</p>
          <p>Södra Skogsägarna</p>
          <p>Länsförsäkringar Jönköping</p>
          <p>Husqvarna</p>
          <p>Husqvarna</p>
        </div>

        {/* EDUCATION & WORK EXPERIENCE */}
        <div className="">
          <div>
            <p className="opacity-50 pb-50">WORK EXPERIENCE</p>
            <ul>
              <li>New Media Design, Jönköping University</li>
              <li>Estetik & Media, Jenny Nyströmsskolan</li>
            </ul>
          </div>

          <div>
            <p className="opacity-50">EDUCATION</p>
            <ul>
              <li>New Media Design, Jönköping University</li>
              <li>Estetik & Media, Jenny Nyströmsskolan</li>
            </ul>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
