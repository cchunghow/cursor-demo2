export async function getDailyJoke() {
  //const res = await fetch('https://official-joke-api.appspot.com/random_joke', {
  const res = await fetch('http://127.0.0.1:4000/jokes/random', {
    cache: 'no-store'
    //next: { revalidate: 300 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch joke');
  }
  
  return res.json();
} 