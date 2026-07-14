import React, { useState } from 'react';

interface RecipeData {
  recipeName: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  chefTip: string;
  ingredients: string[];
  instructions: string[];
}

export const CulinaryAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setCheckedIngredients({});
    try {
      const res = await fetch('http://localhost:5000/api/baking-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      if (data.result) {
        const parsedRecipe: RecipeData = JSON.parse(data.result);
        setRecipe(parsedRecipe);
      }
    } catch (err) {
      console.error('Error fetching recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.025em' }}>
          Culinary<span style={{ color: '#e11d48' }}>API</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
          Transforming elite techniques into five-star home execution.
        </p>
      </header>
      
      <form onSubmit={handleSubmit} style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)', border: '1px solid #f1f5f9', marginBottom: '32px' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#334155', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          What are we crafting tonight?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Pan-seared duck breast with a blackberry reduction..."
          rows={3}
          style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s', resize: 'vertical' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '14px', marginTop: '16px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'background-color 0.2s shadow 0.2s' }}
        >
          {loading ? 'Analyzing Flavor Matrices...' : 'Generate 5-Star Protocol'}
        </button>
      </form>

      {recipe && (
        <article style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)', border: '1px solid #e2e8f0', animation: 'fadeIn 0.5s ease' }}>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '16px', lineHeight: 1.3 }}>
            {recipe.recipeName}
          </h2>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>⏱️ Prep: {recipe.prepTime}</span>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>🔥 Cook: {recipe.cookTime}</span>
            <span style={{ background: '#fff1f2', border: '1px solid #ffe4e6', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#e11d48' }}>📊 Skill: {recipe.difficulty}</span>
          </div>

          <div style={{ margin: '0 0 32px 0', padding: '16px', background: '#f8fafc', borderLeft: '4px solid #0f172a', borderRadius: '0 12px 12px 0' }}>
            <strong style={{ display: 'block', color: '#0f172a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Chef's Secret Protocol</strong>
            <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.5 }}>{recipe.chefTip}</p>
          </div>

          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>Ingredients</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recipe.ingredients.map((ing, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '1rem', color: checkedIngredients[idx] ? '#94a3b8' : '#334155', textDecoration: checkedIngredients[idx] ? 'line-through' : 'none', transition: 'color 0.2s' }}>
                  <input 
                    type="checkbox" 
                    checked={!!checkedIngredients[idx]} 
                    onChange={() => toggleIngredient(idx)}
                    style={{ marginTop: '4px', cursor: 'pointer', accentColor: '#0f172a' }}
                  />
                  <span>{ing}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '20px' }}>Step-by-Step Execution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {recipe.instructions.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>
                    {idx + 1}
                  </span>
                  <p style={{ margin: 0, color: '#334155', lineHeight: 1.6, fontSize: '1rem', paddingTop: '2px' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </article>
      )}
    </div>
  );
};