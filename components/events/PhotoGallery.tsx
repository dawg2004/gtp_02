import type { EventItem } from "@/lib/types";

export function PhotoGallery({ event }: { event: EventItem }) {
  const images = [event.image, "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=900&q=80", "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80"];
  return (
    <section className="mt-14">
      <h2 className="font-serif text-4xl text-stone-950">Photo Gallery</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <img key={image} src={image} alt={`${event.title} gallery ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
        ))}
      </div>
    </section>
  );
}
