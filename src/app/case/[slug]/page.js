// src/app/case/[slug]/page.jsx

import projects from '../../../data/projects';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageWrapper from '../../components/PageWrapper';

export default function CasePage({ params }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return notFound();

    return (
        <PageWrapper>
            <section className="mx-auto text-center space-y-6">
                <div className='mt-56 mb-56'>
                    <h1 className="text-headline">{project.title}</h1>
                    <p className="text-base">{project.description}</p>
                </div>

                <div className="aspect-[16/9] relative w-full">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                
            </section>
        </PageWrapper>
    );
}
