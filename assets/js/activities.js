/* Actividades interactivas. Cada una se monta en <div data-act="id">. */
const Q={
diag:[['¿Qué es un dataset?',['Un programa para graficar','Un conjunto organizado de datos sobre un tema','Un tipo de hoja de cálculo'],1,'Es un conjunto organizado de datos; puede venir en CSV, JSON, etc.'],
['CSV significa…',['Valores separados por comas (Comma-Separated Values)','Código de Sistema Virtual','Conjunto de Series Vectoriales'],0,'Es texto plano con valores separados por un delimitador, normalmente coma.'],
['En una tabla de datos, una fila suele ser…',['Una variable','Un registro u observación','Una licencia'],1,'Las columnas son variables; las filas, registros.'],
['Kaggle es…',['Una plataforma con datasets, notebooks, competiciones y comunidad','Solo un editor de texto','Un banco de datos privado de empresas'],0,'Reúne datos, código, modelos y comunidad.'],
['Un valor faltante es…',['Un error de ortografía','Una celda sin dato','Un duplicado'],1,'Puede ser ausencia legítima o un problema de captura.'],
['La transformación digital consiste en…',['Solo comprar software','Cambiar procesos, personas y modelo de gestión apoyándose en tecnología y datos','Cambiar el logo'],1,'La tecnología es un habilitador, no el objetivo.'],
['Un KPI es…',['Un indicador clave para medir un resultado','Un formato de archivo','Un tipo de licencia'],0,'Ejemplo: tasa de rotación de personal.'],
['Si dos variables se correlacionan, ¿una causa la otra?',['Sí, siempre','No necesariamente','Solo si el dataset es popular'],1,'La correlación no demuestra causalidad.']],
funcs:[['Quiere ver el análisis que otro usuario hizo con un dataset: ¿dónde buscar?',['Models','Notebooks (sección Code)','Learn'],1,'Los notebooks contienen código y resultados publicados.'],
['Necesita datos para responder una pregunta empresarial:',['Datasets','Discussions','Competitions'],0,'Datasets es la sección de datos descargables.'],
['Quiere practicar modelado con reglas y una métrica de evaluación:',['Discussions','Learn','Competitions'],2,'Las competiciones definen datos, reglas y evaluación.'],
['Tiene una duda sobre un dataset y quiere ver experiencias de la comunidad:',['Models','Discussions','Datasets'],1,'Discussions reúne preguntas y respuestas; valore críticamente la información.']],
lic:[['Un dataset es público en Kaggle. ¿Puede usarlo sin restricciones?',['Sí, público significa libre','No: debe revisar la licencia y condiciones','Solo si tiene muchas descargas'],1,'Disponibilidad pública no es autorización ilimitada.'],
['¿Cuál es una buena práctica de atribución?',['Citar autor, fuente y enlace','Omitir al autor si modifica los datos','Citar solo la plataforma'],0,'Siempre reconozca la autoría según la licencia.'],
['Un dataset con nombres y correos de personas reales exige…',['Publicarlo en su repositorio','Evaluar riesgos de privacidad y base legal antes de usarlo','Ignorar el tema si es un CSV'],1,'Los datos personales requieren cuidado especial.'],
['Un dataset con 10 000 votos es automáticamente…',['De alta calidad','Adecuado para cualquier caso','Popular, pero debe evaluarse igual']  ,2,'Popularidad no es calidad.']]};
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KW=[{p:'Una empresa quiere entender por qué se van sus empleados.',o:[['employee attrition',1,'Término estándar en inglés para rotación.'],['HR analytics',1,'Cubre analítica de recursos humanos.'],['rotación de personal',1,'Útil en español, aunque habrá menos resultados.'],['football results',0,'No guarda relación con el problema.'],['stock prices',0,'Es otro tema (finanzas).'],['Titanic',0,'Dataset popular, pero no pertinente.']]},{p:'Una tienda en línea quiere medir entregas tardías y reseñas.',o:[['e-commerce orders',1,'Pedidos de comercio electrónico.'],['delivery reviews',1,'Combina entregas y reseñas.'],['customer reviews',1,'Reseñas de clientes.'],['weather forecast',0,'Tema distinto.'],['cat images',0,'Sin relación.'],['genome',0,'Sin relación.']]}];
const MATCH=[['Analizar por qué renuncian los empleados',0],['Estudiar pedidos, clientes y reseñas de una tienda en línea de Brasil',1],['Analizar ventas minoristas por cliente y producto (verifique las variables en la ficha)',2],['Comparar indicadores de países a lo largo del tiempo',3],['Explorar cómo se adopta la IA en organizaciones',4]];
const MN=['IBM HR Analytics Employee Attrition','Olist Brazilian E-Commerce','Online Retail','World Development Indicators (búsqueda)','AI Adoption (búsqueda)'];
const FIELDS=[['nombre','Nombre del estudiante','t'],['problema','Problema identificado','a'],['pregunta','Pregunta de análisis','a'],['enlaces','Enlaces de los datasets consultados (mínimo dos)','a'],['seleccion','Dataset seleccionado y justificación','a'],['evidencia','Evidencia de exploración y descarga (describa lo que hizo; no se verifica automáticamente)','a'],['variables','Variables principales','a'],['licencia','Licencia y limitaciones','a'],['indicadores','Tres indicadores propuestos','a'],['oportunidad','Oportunidad de transformación','a'],['conclusion','Conclusión (distinga correlación y causa)','a']];
function saveDraft(id, data) { P.saveResponse(id, {...data, evaluated:false}); }
function lockInputs(el, buttonSelector) {
  el.querySelectorAll('input, select, textarea').forEach(control => { control.disabled = true; });
  const button = buttonSelector ? el.querySelector(buttonSelector) : null;
  if (button) button.disabled = true;
}
function restoreChecked(el, selector, values) {
  el.querySelectorAll(selector).forEach((control, i) => { control.checked = !!(values && values[i]); });
}
function restoreSelects(el, selector, values) {
  el.querySelectorAll(selector).forEach((control, i) => { if (values && values[i] !== undefined) control.value = String(values[i]); });
}
function responseOrUndo(id) {
  const saved = P.response(id);
  if (!saved && P.s().act[id] && P.s().act[id].completed) P.undone(id);
  return saved;
}
function quiz(el, id, qs, final) {
  const storedAnswers = P.response(id) || {};
  let ans = {};
  Object.keys(storedAnswers).forEach(key => {
    const index = Number(key), answer = storedAnswers[key], selected = answer && Number(answer.selected);
    if (/^\d+$/.test(key) && index >= 0 && index < qs.length && Number.isInteger(selected) && selected >= 0 && selected < qs[index][1].length) ans[index] = {selected, correct:selected === qs[index][2]};
  });
  const draw = () => {
    el.innerHTML = qs.map((q, i) => {
      const a = ans[i];
      const buttons = q[1].map((o, j) => {
        const selected = a && Number(a.selected) === j;
        const cls = a && j === q[2] ? ' ok' : (selected && Number(a.selected) !== q[2] ? ' no' : '');
        return `<button class="opt${cls}" data-j="${j}"${a ? ' disabled aria-disabled="true"' : ''}>${o}</button>`;
      }).join('');
      const feedback = a ? (Number(a.selected) === q[2] ? '<b>Correcto.</b> ' : '<b>Incorrecto.</b> La respuesta es «' + q[1][q[2]] + '». ') + q[3] : '';
      return `<div class="card" data-i="${i}"><b>${i+1}. ${q[0]}</b>${buttons}<div class="fb" aria-live="polite">${feedback}</div></div>`;
    }).join('') + `<div class="note" id="s-${id}" hidden></div>`;
    renderSummary();
  };
  const renderSummary = () => {
    const complete = qs.every((q,i) => ans[i] && Number.isInteger(Number(ans[i].selected)) && Number(ans[i].selected) >= 0 && Number(ans[i].selected) < q[1].length);
    const n = el.querySelector('#s-' + id);
    if (complete) {
      const score = qs.reduce((sum, q, i) => sum + (ans[i] && Number(ans[i].selected) === q[2] ? 1 : 0), 0);
      n.hidden = false;
      n.innerHTML = `<b>Resultado: ${score} de ${qs.length} (${Math.round(100*score/qs.length)} %).</b> ${final ? final(score/qs.length) : ''} <button class="btn sm s" data-retry>Volver a intentar</button>`;
      P.done(id, score, qs.length);
    } else {
      n.hidden = true;
      if (P.s().act[id] && P.s().act[id].completed) P.undone(id);
    }
  };
  draw();
  el.onclick = e => {
    const retry = e.target.closest('[data-retry]');
    if (retry) {
      ans = {};
      P.clearResponse(id);
      P.undone(id);
      draw();
      return;
    }
    const button = e.target.closest('.opt');
    if (!button || button.disabled) return;
    const card = button.closest('.card');
    const i = Number(card.dataset.i);
    if (ans[i]) return;
    const selected = Number(button.dataset.j);
    ans[i] = {selected, correct:selected === qs[i][2]};
    P.saveResponse(id, ans);
    draw();
  };
}

const MT={
  kw(el) {
    el.innerHTML = KW.map((s,i)=>`<div class="card"><b>Encuentra el dataset correcto — ${s.p}</b><p>Seleccione las palabras clave pertinentes:</p>${s.o.map((o,j)=>`<label class="chk"><input type="checkbox" data-i="${i}" data-j="${j}"> ${o[0]}</label>`).join('')}</div>`).join('') + '<label class="f" for="kwj">Justifique su estrategia (por qué esas palabras, y por qué incluir inglés):</label><textarea id="kwj"></textarea><button class="btn" id="kwb">Evaluar</button><div class="fb" id="kwf" aria-live="polite"></div>';
    const saved = responseOrUndo('kw');
    if (saved) {
      KW.forEach((x,i)=>x.o.forEach((o,j)=>{const input=el.querySelector(`input[data-i="${i}"][data-j="${j}"]`);input.checked=!!(saved.selected&&saved.selected[i]&&saved.selected[i][j]);}));
      el.querySelector('#kwj').value=saved.justification||'';
    }
    const capture=()=>({selected:KW.map((x,i)=>x.o.map((o,j)=>el.querySelector(`input[data-i="${i}"][data-j="${j}"]`).checked)),justification:el.querySelector('#kwj').value});
    const evaluate=()=>{
      const data=capture(), f=el.querySelector('#kwf'), j=data.justification.trim();
      if(KW.some((x,i)=>!data.selected[i].some(Boolean))){f.textContent='Seleccione al menos una palabra clave para cada caso antes de evaluar.';return;}
      if(j.length<20){f.textContent='Escriba una justificación de al menos 20 caracteres.';return;}
      let score=0,max=0,feedback='';
      KW.forEach((x,i)=>x.o.forEach((o,k)=>{const checked=data.selected[i][k];if(o[1]){max++;if(checked)score++;else feedback+=`<li>Faltó «${o[0]}»: ${o[2]}</li>`;}else if(checked){score--;feedback+=`<li>«${o[0]}» no es pertinente: ${o[2]}</li>`;}}));
      score=Math.max(0,score);
      f.innerHTML=`<b>Puntaje: ${score} de ${max}.</b><ul>${feedback||'<li>Selección completa y pertinente.</li>'}</ul>`;
      P.saveResponse('kw',{...data,evaluated:true});P.done('kw',score,max);lockInputs(el,'#kwb');
    };
    el.querySelectorAll('input,textarea').forEach(input=>input.addEventListener(input.tagName==='TEXTAREA'?'input':'change',()=>{if(!(P.response('kw')||{}).evaluated)saveDraft('kw',capture());}));
    el.querySelector('#kwb').onclick=e=>{if(e.currentTarget.disabled)return;evaluate();};
    if(saved&&saved.evaluated)evaluate();
  },
  chk(el) {
    const done=()=>ST.every((_,i)=>!!P.s().chk['d'+i]);
    el.innerHTML='<div class="card"><b>Mi primera descarga</b><div class="note warn">Esta lista es un <b>autorreporte</b>: marcar una casilla no descarga nada ni la página puede comprobar que lo hizo. La descarga real ocurre en Kaggle.</div>'+ST.map((s,i)=>`<label class="chk"><input type="checkbox" data-d="${i}" ${P.s().chk['d'+i]?'checked':''}> ${s}</label>`).join('')+'<p id="chkr"></p></div>';
    const upd=()=>{const n=ST.filter((_,i)=>P.s().chk['d'+i]).length;el.querySelector('#chkr').textContent=`${n} de ${ST.length} pasos marcados por usted.`;if(done())P.done('chk',ST.length,ST.length);else P.undone('chk');};
    el.onchange=e=>{if(e.target.dataset.d!==undefined){P.chk('d'+e.target.dataset.d,e.target.checked);upd();}};
    upd();
  },
  cmp(el) {
    const D=[['A','500 000 filas','2012','No indicada','Muy popular; muchos vacíos; sin diccionario'],['B','20 000 filas','Actualizado el último año','Licencia clara con atribución','Documentado; datos anonimizados de una empresa; un solo país'],['C','5 000 filas','Sintético','Permisiva','Sin diccionario de datos; no refleja personas reales']];
    el.innerHTML=`<div class="card"><b>Detective de datasets</b> (casos ficticios)<p>Caso: una empresa colombiana desea analizar la rotación de personal en 2026.</p><div class="tw"><table><tr><th>Dataset<th>Tamaño<th>Fecha<th>Licencia<th>Observaciones</tr>${D.map(r=>'<tr>'+r.map(c=>`<td>${c}`).join('')+'</tr>').join('')}</table></div><label class="f" for="cs">Elija:</label><select id="cs"><option value="">Elija…</option>${D.map(r=>`<option value="${r[0]}">${r[0]}</option>`).join('')}</select><label class="f" for="cj">Justifique (no hay una respuesta única; se valoran los criterios que use):</label><textarea id="cj"></textarea><button class="btn" id="cb">Evaluar</button><div class="fb" id="cf" aria-live="polite"></div></div>`;
    const CR=[['licencia',/licenc|licens/i],['fecha/vigencia',/fecha|actual|vigen|2012|antigu|date|current|outdated|recent/i],['documentación',/document|diccionario|dictionary/i],['sesgo/representatividad',/sesgo|representa|muestra|sint[eé]tic|bias|sample|synthetic/i],['privacidad',/privac|anonim|personal|anonym/i],['limitaciones',/limitaci|l[ií]mite|limitation|limit/i]];
    const saved=responseOrUndo('cmp');
    if(saved){el.querySelector('#cs').value=saved.dataset||'';el.querySelector('#cj').value=saved.justification||'';}
    const capture=()=>({dataset:el.querySelector('#cs').value,justification:el.querySelector('#cj').value});
    const evaluate=()=>{
      const data=capture(),j=data.justification,f=el.querySelector('#cf');
      if(!data.dataset){f.textContent='Seleccione un dataset antes de evaluar.';return;}
      if(j.trim().length<30){f.textContent='Escriba una justificación más completa (≥30 caracteres).';return;}
      const h=CR.filter(c=>c[1].test(j)),m=CR.filter(c=>!c[1].test(j)),score=Math.min(3,h.length);
      f.innerHTML=`<b>Puntaje: ${score} de 3.</b> Criterios que usó: ${h.map(c=>c[0]).join(', ')||'ninguno'}. Pudo considerar: ${m.map(c=>c[0]).join(', ')}.<br>Análisis: A es grande y popular pero antiguo y sin licencia clara; B parece el más defendible, aunque está limitado a un país; C es sintético y no sirve para conclusiones sobre personas reales. Si elige C o A debe argumentar los riesgos.`;
      P.saveResponse('cmp',{...data,evaluated:true});P.done('cmp',score,3);lockInputs(el,'#cb');
    };
    el.querySelectorAll('select,textarea').forEach(input=>input.addEventListener(input.tagName==='TEXTAREA'?'input':'change',()=>{if(!(P.response('cmp')||{}).evaluated)saveDraft('cmp',capture());}));
    el.querySelector('#cb').onclick=e=>{if(!e.currentTarget.disabled)evaluate();};
    if(saved&&saved.evaluated)evaluate();
  },
  qual(el) {
    const R=[['id','ciudad','edad','ingreso','salario'],[1,'Cúcuta',29,'2021-03-01',3200000],[1,'Cúcuta',29,'2021-03-01',3200000],[2,'Bogotá',41,'2018-07-15',5100000],[3,'Cali',250,'2020-01-10',2800000],[4,'Medellín',35,'2019-11-02',''],[5,'cucuta ',27,'2022-05-20',2900000],[6,'Bogotá',33,'2031-01-01',4000000],[7,'Cali',38,'2017-09-09',4500000]];
    const BAD={2:'Duplicado exacto de la fila 1.',4:'Edad 250 es un valor atípico/imposible.',5:'Salario vacío (valor faltante).',6:'«cucuta » difiere de «Cúcuta» (inconsistencia).',7:'Fecha de ingreso en el futuro.'};
    el.innerHTML=`<div class="card"><b>Identificación de problemas de calidad</b> (datos ficticios). Marque las filas con problemas.<div class="tw"><table>${R.map((r,i)=>`<tr>${i?`<td><input type="checkbox" data-r="${i}" aria-label="Fila ${i} con problema">`:'<th>#'}${r.map(c=>i?`<td>${c}`:`<th>${c}`).join('')}</tr>`).join('')}</table></div><button class="btn" id="qb">Evaluar</button><div class="fb" id="qf" aria-live="polite"></div></div>`;
    const saved=responseOrUndo('qual');if(saved)restoreChecked(el,'[data-r]',saved.selected);
    const capture=()=>({selected:R.slice(1).map((_,k)=>el.querySelector(`[data-r="${k+1}"]`).checked)});
    const evaluate=()=>{
      const data=capture(),f=el.querySelector('#qf');
      if(!data.selected.some(Boolean)){f.textContent='Marque al menos una fila que considere problemática antes de evaluar.';return;}
      let score=0,feedback='';
      R.slice(1).forEach((_,k)=>{const i=k+1,checked=data.selected[k];if(BAD[i]){if(checked)score++;feedback+=`<li>Fila ${i}: ${BAD[i]} ${checked?'✔':'(no la marcó)'}</li>`;}else if(checked){score--;feedback+=`<li>Fila ${i} no tiene problema evidente.</li>`;}});
      score=Math.max(0,score);f.innerHTML=`<b>Puntaje: ${score} de 5.</b><ul>${feedback}</ul>`;
      P.saveResponse('qual',{...data,evaluated:true});P.done('qual',score,5);lockInputs(el,'#qb');
    };
    el.querySelectorAll('[data-r]').forEach(input=>input.addEventListener('change',()=>{if(!(P.response('qual')||{}).evaluated)saveDraft('qual',capture());}));
    el.querySelector('#qb').onclick=e=>{if(!e.currentTarget.disabled)evaluate();};if(saved&&saved.evaluated)evaluate();
  },
  cls(el) {
    const V=[['edad',0,'Numérica: se puede promediar.'],['id_cliente',3,'Identificador: no se suma ni promedia.'],['ciudad',1,'Categórica.'],['fecha_compra',2,'Fecha.'],['total_pedido',0,'Numérica.'],['codigo_postal',1,'Aunque tenga dígitos, se trata como categoría/código: no se suma.'],['abandono (Sí/No)',1,'Categórica binaria.']],T=['Numérica','Categórica','Fecha/hora','Identificador'];
    el.innerHTML='<div class="card"><b>Clasificación de variables</b>'+V.map((v,i)=>{return `<div class="row"><span>${v[0]}</span><select data-v="${i}" aria-label="Tipo de ${v[0]}"><option value="">Elija…</option>${T.map((t,j)=>`<option value="${j}">${t}</option>`).join('')}</select></div>`;}).join('')+'<button class="btn" id="cb">Evaluar</button><div class="fb" id="cf" aria-live="polite"></div></div>';
    const saved=responseOrUndo('cls');if(saved)restoreSelects(el,'[data-v]',saved.values);
    const capture=()=>({values:[...el.querySelectorAll('[data-v]')].map(s=>s.value)});
    const evaluate=()=>{
      const data=capture(),sel=el.querySelectorAll('[data-v]'),f=el.querySelector('#cf');
      if([...sel].some(s=>s.value==='')){f.textContent='Clasifique todas las variables antes de evaluar.';return;}
      let score=0,feedback='';V.forEach((v,i)=>{const ok=Number(sel[i].value)===v[1];if(ok)score++;feedback+=`<li>${v[0]}: ${ok?'✔':'✘'} ${v[2]}</li>`;});
      f.innerHTML=`<b>Puntaje: ${score} de ${V.length}.</b><ul>${feedback}</ul>`;P.saveResponse('cls',{...data,evaluated:true});P.done('cls',score,V.length);lockInputs(el,'#cb');
    };
    el.querySelectorAll('[data-v]').forEach(input=>input.addEventListener('change',()=>{if(!(P.response('cls')||{}).evaluated)saveDraft('cls',capture());}));
    el.querySelector('#cb').onclick=e=>{if(!e.currentTarget.disabled)evaluate();};if(saved&&saved.evaluated)evaluate();
  },
  match(el) {
    el.innerHTML='<div class="card"><b>Relacione problemas con datasets</b>'+MATCH.map((m,i)=>`<div class="row"><span>${m[0]}</span><select data-m="${i}" aria-label="Dataset para el problema ${i+1}"><option value="">Elija…</option>${MN.map((n,j)=>`<option value="${j}">${n}</option>`).join('')}</select></div>`).join('')+'<button class="btn" id="mb">Evaluar</button><div class="fb" id="mf" aria-live="polite"></div><small>Las fichas se deben verificar en Kaggle antes de decidir.</small></div>';
    const saved=responseOrUndo('match');if(saved)restoreSelects(el,'[data-m]',saved.values);
    const capture=()=>({values:[...el.querySelectorAll('[data-m]')].map(s=>s.value)});
    const evaluate=()=>{
      const data=capture(),sel=el.querySelectorAll('[data-m]'),f=el.querySelector('#mf');
      if([...sel].some(s=>s.value==='')){f.textContent='Responda todas las filas antes de evaluar.';return;}
      let score=0,feedback='';MATCH.forEach((m,i)=>{const ok=Number(sel[i].value)===m[1];if(ok)score++;else feedback+=`<li>Problema ${i+1}: la mejor opción es «${MN[m[1]]}».</li>`;});
      f.innerHTML=`<b>Puntaje: ${score} de ${MATCH.length}.</b><ul>${feedback}</ul>`;P.saveResponse('match',{...data,evaluated:true});P.done('match',score,MATCH.length);lockInputs(el,'#mb');
    };
    el.querySelectorAll('[data-m]').forEach(input=>input.addEventListener('change',()=>{if(!(P.response('match')||{}).evaluated)saveDraft('match',capture());}));
    el.querySelector('#mb').onclick=e=>{if(!e.currentTarget.disabled)evaluate();};if(saved&&saved.evaluated)evaluate();
  },
  fin(el) {
    el.innerHTML='<div class="card"><b>Ficha de entrega</b> (se guarda en este navegador)'+FIELDS.map(f=>`<label class="f" for="f-${f[0]}">${f[1]}</label>${f[2]==='t'?`<input class="t" id="f-${f[0]}" data-f="${f[0]}">`:`<textarea id="f-${f[0]}" data-f="${f[0]}"></textarea>`}`).join('')+'<p><button class="btn" id="fd">Descargar .txt</button> <button class="btn s" id="fp">Imprimir / guardar PDF</button> <button class="btn s" id="fc">Borrar ficha</button></p><div class="fb" id="ff" aria-live="polite"></div></div>';
    el.querySelectorAll('[data-f]').forEach(input=>{input.value=P.s().txt[input.dataset.f]||'';input.oninput=()=>{P.txt(input.dataset.f,input.value);const missing=FIELDS.some(f=>!(P.s().txt[f[0]]||'').trim());if(missing&&P.s().act.fin&&P.s().act.fin.completed)P.undone('fin');};});
    const need=()=>{const missing=FIELDS.filter(f=>!(P.s().txt[f[0]]||'').trim());el.querySelector('#ff').textContent=missing.length?'Faltan campos: '+missing.map(f=>f[1].split(' (')[0]).join('; '):'';return missing.length===0;};
    el.querySelector('#fd').onclick=()=>{
      if(!need())return;
      const content=tr('KAGGLE LAB — FICHA DE ENTREGA')+'\n\n'+FIELDS.map(f=>`${tr(f[1])}:\n${P.s().txt[f[0]]}\n`).join('\n');
      const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='ficha-kaggle-lab.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);P.done('fin',1,1);
    };
    el.querySelector('#fp').onclick=()=>{if(!need())return;P.done('fin',1,1);document.body.classList.add('pf');print();setTimeout(()=>document.body.classList.remove('pf'),500);};
    el.querySelector('#fc').onclick=()=>{if(confirm(tr('¿Borrar los campos de la ficha?'))){FIELDS.forEach(f=>P.txt(f[0],''));el.querySelectorAll('[data-f]').forEach(i=>i.value='');P.undone('fin');el.querySelector('#ff').textContent='';}};
  }
};
function mountAll(){
  $$('[data-act]').forEach(el=>{
    const id=el.dataset.act;
    if(Q[id])quiz(el,id,Q[id],id==='diag'?r=>r<.5?'Comience por los Módulos 1 y 2.':r<.8?'Buen punto de partida: refuerce los Módulos 3 y 4.':'Sólido: avance al Módulo 3 y practique la descarga real.':null);
    else if(MT[id])MT[id](el);
  });
}
