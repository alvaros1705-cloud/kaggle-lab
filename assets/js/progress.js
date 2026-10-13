/* Progreso local (localStorage). Si está bloqueado, funciona en memoria y avisa. */
const ACTS=['diag','funcs','kw','chk','cmp','qual','lic','cls','match','fin'];
const MODS=['m0','m1','m2','m3','m4','m5','m6','m7','m8'];
const P=(()=>{
  const fresh=()=>({mods:{},act:{},chk:{},txt:{},responses:{}});
  let s=fresh(),ok=true;
  try{
    const r=localStorage.getItem('kagglelab');
    if(r){
      const parsed=JSON.parse(r);
      if(parsed&&typeof parsed==='object')s={...fresh(),...parsed,responses:parsed.responses||{}};
    }
  }catch(e){ok=false}
  const flush=()=>{try{localStorage.setItem('kagglelab',JSON.stringify(s));return true}catch(e){ok=false;document.dispatchEvent(new Event('storefail'));return false}};
  const isDone=a=>!!(s.act[a]&&s.act[a].completed);
  return{
    get ok(){return ok},s:()=>s,
    visit(m){if(!s.mods[m]){s.mods[m]=1;flush()}},
    done(a,sc,mx){
      const o=s.act[a];
      s.act[a]={s:sc,m:mx,best:Math.max(Number(sc)||0,o?Number(o.best)||0:0),completed:true};
      flush();document.dispatchEvent(new Event('progress'));
    },
    undone(a){
      if(s.act[a])s.act[a].completed=false;
      flush();document.dispatchEvent(new Event('progress'));
    },
    response(a){return s.responses[a]||null},
    saveResponse(a,v){s.responses[a]=v;flush()},
    clearResponse(a){delete s.responses[a];flush()},
    chk(k,v){s.chk[k]=v;flush();document.dispatchEvent(new Event('progress'))},
    txt(k,v){s.txt[k]=v;flush()},
    pct(){return Math.round(100*(Object.keys(s.mods).length+ACTS.filter(isDone).length)/(MODS.length+ACTS.length))},
    badges(){
      const a=s.act,q=['diag','funcs','lic'].every(k=>isDone(k)&&a[k].m>0&&a[k].best/a[k].m>=.8);
      return[
        ['Explorador',MODS.every(m=>s.mods[m]),'Visitó los 9 módulos'],
        ['Primer paso',isDone('chk'),'Completó la lista de «Mi primera descarga» (autorreporte)'],
        ['Detective',isDone('cmp')&&isDone('qual'),'Completó comparador y problemas de calidad'],
        ['Mente analítica',q,'≥80 % en diagnóstico, funcionalidades y licencias'],
        ['Retador',isDone('fin'),'Preparó y exportó su ficha del reto final']
      ]
    },
    reset(){s=fresh();flush();document.dispatchEvent(new Event('progress'))}
  }
})();
