import JokeCard from "@/components/JokeCard";
import { getDailyJoke } from "@/utils/jokes";

export default async function Home() {
  const joke = await getDailyJoke();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Daily Joke
        </h1>
        <JokeCard
          id={joke.id.toString()}
          setup={joke.setup}
          punchline={joke.punchline}
          category={joke.type}
        />
      </div>
    </main>
  );
}
