// src/utils/textFormatters.ts

// JERARQUÍA DE AUTORES
const piRegex = /(Horacio Poblete|H\.?\s*Poblete|Poblete,?\s*H\.?|Poblete,?\s*Horacio)/gi;

// Se añade el comodín [-\s\u2010-\u2015] para detectar cualquier tipo de guion o espacio
const currentMembersRegex = /(Alejandro Ide|A\.?\s*Ide|Basti[aá]n(?:[-\s\u2010-\u2015]Alexander)?\s*Morales(?:[-\s\u2010-\u2015]Aravena)?|B\.?(?:\s*A\.?)?\s*Morales(?:[-\s\u2010-\u2015]Aravena)?|Eduardo Cubillos(?:[-\s\u2010-\u2015]Llant[eé]n)?|E\.?\s*Cubillos(?:[-\s\u2010-\u2015]Llant[eé]n)?|Francisca Salas(?:[-\s\u2010-\u2015]Sep[uú]lveda)?|F\.?\s*Salas(?:[-\s\u2010-\u2015]Sep[uú]lveda)?|Jorge(?:[-\s\u2010-\u2015]Crist[oó]bal)?\s*Carrillo(?:[-\s\u2010-\u2015]Silva)?|J\.?(?:\s*C\.?)?\s*Carrillo(?:[-\s\u2010-\u2015]Silva)?|(?:L\.?\s*)?Gonzalo Espinoza(?:[-\s\u2010-\u2015]Arcos)?|(?:L\.?\s*G\.?|G\.?)\s*Espinoza(?:[-\s\u2010-\u2015]Arcos)?|Mat[ií]as Rojas|M\.?\s*Rojas|Mat[ií]as Vald[eé]s(?:[-\s\u2010-\u2015]Pe[nñ]a)?|M\.?\s*Vald[eé]s(?:[-\s\u2010-\u2015]Pe[nñ]a)?|Patricio Briones(?:[-\s\u2010-\u2015]Rebolledo)?|P\.?\s*Briones(?:[-\s\u2010-\u2015]Rebolledo)?|Ra[uú]l Sep[uú]lveda|R\.?\s*Sep[uú]lveda)/gi;

const alumniRegex = /(Constanza Galaz(?:[-\s\u2010-\u2015]Araya)?|C\.?\s*Galaz(?:[-\s\u2010-\u2015]Araya)?|Mat[ií]as Z[uú][nñ]iga(?:[-\s\u2010-\u2015]Bustos)?|M\.?\s*Z[uú][nñ]iga(?:[-\s\u2010-\u2015]Bustos)?)/gi;

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Returns an HTML string: the input is escaped first, so it is safe to use with set:html.
export const highlightAuthor = (authorsString: string) => {
  let result = escapeHtml(authorsString);
  // Nivel 1: PI (Naranja Extra Negrita Alto Contraste)
  result = result.replace(piRegex, '<span class="font-extrabold text-orange-600 dark:text-orange-400">$1</span>');
  // Nivel 2: Current Team (Azul)
  result = result.replace(currentMembersRegex, '<span class="font-bold text-lab-blue dark:text-blue-400">$1</span>');
  // Nivel 3: Former Mentees (Gris Oscuro/Claro)
  result = result.replace(alumniRegex, '<span class="font-bold text-slate-800 dark:text-gray-300">$1</span>');
  return result;
};