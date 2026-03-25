// SPLASH
var done = false;
function hideSplash(){
  if(done) return; done = true;
  var s = document.getElementById('splash');
  var w = document.getElementById('site');
  s.style.opacity = '0';
  setTimeout(function(){ s.style.display='none'; w.style.display='block'; }, 800);
}
setTimeout(hideSplash, 2000);

// VIEWS
function showView(name){
  document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function(a){ a.classList.remove('active'); });
  document.getElementById('view-'+name).classList.add('active');
  var n = document.getElementById('nav-'+name);
  if(n) n.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// MODAL
var pData = {
  strength:{title:'Strength Training',tag:'Intermediate - Advanced',desc:'Built around progressive overload principles to help you build real functional muscle and serious power over time.',pts:['5-day split (Push/Pull/Legs)','Barbell compound movements','Accessory hypertrophy work','Monthly strength testing','Nutrition guidance included']},
  fatloss:{title:'Fat Loss',tag:'Beginner - Intermediate',desc:'Combines HIIT, circuit training, and smart nutrition to maximize calorie burn while preserving lean muscle.',pts:['HIIT & metabolic conditioning','4 sessions per week','Cardio & resistance combo','Calorie deficit coaching','Weekly progress tracking']},
  functional:{title:'Functional Fitness',tag:'All Levels',desc:'Focuses on mobility, stability, and endurance to improve how your body moves in real life.',pts:['Mobility & flexibility protocols','Core strength foundation','Balance and coordination drills','Sport-specific movements','Injury prevention focus']}
};
function openModal(k){
  var d=pData[k];
  document.getElementById('mContent').innerHTML='<h3>'+d.title+'</h3><div class="modal-tag">'+d.tag+'</div><p>'+d.desc+'</p><ul>'+d.pts.map(function(p){return'<li>'+p+'</li>';}).join('')+'</ul>';
  document.getElementById('mOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('mOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeModal(); });

// BMI
var bmiUnit='metric';
function setBmiUnit(u){
  bmiUnit=u;
  document.getElementById('bmiM').classList.toggle('active',u==='metric');
  document.getElementById('bmiI').classList.toggle('active',u==='imperial');
  document.getElementById('bmiWL').textContent=u==='metric'?'Weight (kg)':'Weight (lbs)';
  document.getElementById('bmiHL').textContent=u==='metric'?'Height (cm)':'Height (inches)';
  document.getElementById('bmiW').placeholder=u==='metric'?'e.g. 70':'e.g. 154';
  document.getElementById('bmiH').placeholder=u==='metric'?'e.g. 175':'e.g. 69';
  document.getElementById('bmiOut').style.display='none';
}
function doBMI(){
  var w=parseFloat(document.getElementById('bmiW').value);
  var h=parseFloat(document.getElementById('bmiH').value);
  if(!w||!h||w<=0||h<=0){ alert('Please enter valid weight and height.'); return; }
  var bmi=bmiUnit==='metric'? w/Math.pow(h/100,2) : (w/(h*h))*703;
  bmi=Math.round(bmi*10)/10;
  var lbl,col,desc,pct;
  if(bmi<18.5){lbl='Underweight';col='#60a5fa';pct=15;desc='You may benefit from a structured nutrition and strength program to build healthy muscle mass.';}
  else if(bmi<25){lbl='Normal Weight';col='#1db954';pct=40;desc='Great! You are in a healthy range. Keep it up with consistent training and good nutrition.';}
  else if(bmi<30){lbl='Overweight';col='#f59e0b';pct=65;desc='A combination of cardio and strength training with a caloric deficit can help you reach a healthy range.';}
  else{lbl='Obese';col='#ef4444';pct=88;desc='We recommend starting with our Fat Loss program and consulting a healthcare professional.';}
  document.getElementById('bmiNum').textContent=bmi;
  document.getElementById('bmiNum').style.color=col;
  document.getElementById('bmiLbl').textContent=lbl;
  document.getElementById('bmiLbl').style.color=col;
  document.getElementById('bmiDesc').textContent=desc;
  document.getElementById('bmiBar').style.width=pct+'%';
  document.getElementById('bmiBar').style.background=col;
  document.getElementById('bmiOut').style.display='block';
}

// CALORIES
var calUnit='metric';
function setCalUnit(u){
  calUnit=u;
  document.getElementById('calM').classList.toggle('active',u==='metric');
  document.getElementById('calI').classList.toggle('active',u==='imperial');
  document.getElementById('cWL').textContent=u==='metric'?'Weight (kg)':'Weight (lbs)';
  document.getElementById('cHL').textContent=u==='metric'?'Height (cm)':'Height (inches)';
  document.getElementById('cWeight').placeholder=u==='metric'?'e.g. 70':'e.g. 154';
  document.getElementById('cHeight').placeholder=u==='metric'?'e.g. 175':'e.g. 69';
  document.getElementById('calOut').style.display='none';
}
function doCalories(){
  var age=parseFloat(document.getElementById('cAge').value);
  var gender=document.getElementById('cGender').value;
  var weight=parseFloat(document.getElementById('cWeight').value);
  var height=parseFloat(document.getElementById('cHeight').value);
  var activity=parseFloat(document.getElementById('cActivity').value);
  if(!age||!weight||!height||age<=0||weight<=0||height<=0){
    alert('Please fill in all fields correctly.'); return;
  }
  var wkg=calUnit==='metric'? weight : weight*0.453592;
  var hcm=calUnit==='metric'? height : height*2.54;
  var bmr=gender==='male'? (10*wkg)+(6.25*hcm)-(5*age)+5 : (10*wkg)+(6.25*hcm)-(5*age)-161;
  var tdee=Math.round(bmr*activity);
  var pro=Math.round(wkg*2);
  var fat=Math.round((tdee*0.25)/9);
  var carb=Math.max(0, Math.round((tdee-(pro*4)-(fat*9))/4));
  document.getElementById('calBig').textContent=tdee.toLocaleString();
  document.getElementById('gLoss').textContent=(tdee-500).toLocaleString();
  document.getElementById('gMaint').textContent=tdee.toLocaleString();
  document.getElementById('gGain').textContent=(tdee+300).toLocaleString();
  document.getElementById('mPro').textContent=pro;
  document.getElementById('mCarb').textContent=carb;
  document.getElementById('mFat').textContent=fat;
  var sel=document.getElementById('cActivity');
  document.getElementById('calNote').textContent='Based on the Mifflin-St Jeor formula for a '+age+'-year-old '+gender+'. Activity: '+sel.options[sel.selectedIndex].text.split('(')[0].trim()+'. Adjust based on your progress and consult a nutritionist for a personalised plan.';
  document.getElementById('calOut').style.display='block';
}

// CONTACT
function doContact(){
  var fn=document.getElementById('fname').value.trim();
  var em=document.getElementById('femail').value.trim();
  if(!fn||!em){ alert('Please fill in your name and email.'); return; }
  document.getElementById('fOk').style.display='block';
  document.getElementById('sendBtn').style.display='none';
  ['fname','lname','femail','fprog','fmsg'].forEach(function(id){ document.getElementById(id).value=''; });
  setTimeout(function(){ document.getElementById('fOk').style.display='none'; document.getElementById('sendBtn').style.display='block'; },5000);
}