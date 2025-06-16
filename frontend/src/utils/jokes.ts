export async function getDailyJoke() {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke', {
    cache: 'no-store'
    //next: { revalidate: 300 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch joke');
  }
  
  return res.json();
} 