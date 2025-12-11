// data.js - 逻辑内核 (严格校验版)

const SUPABASE_URL = 'https://mfyvaxphxabtnjrjucip.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Yv8fSmqX64lknihxI-uaYA_fSedU6JW';
let db;

// 0. 初始化数据库
try {
    if (typeof supabase !== 'undefined') {
        db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.warn("Supabase init skipped");
}

// 1. 题目数据 (45题)
const questions = [
    "1. 当TA情绪低落时，你的第一反应是？", "2. 你如何看待TA与你分享的复杂情绪？", "3. 在你们发生小摩擦后，你的情绪修复速度？", "4. 关于彼此情感上的“安全词”或“禁区”？", "5. 你在公开场合表达对TA的爱意或情感支持时？", "6. 当你感到极度兴奋或悲伤时，TA的回应通常是？", "7. 你觉得TA在多大程度上是你的“情绪避风港”？", "8. 你们对彼此的“情绪账户”投资情况是？", "9. 描述一下你们情感交流中最常出现的模式？",
    "10. 你们的作息习惯同步程度如何？", "11. 关于家中物品摆放或空间共享，你们是？", "12. 你们是否有专属的“小仪式”或“暗号”？", "13. 对于饮食偏好或生活琐事上的差异，你们如何处理？", "14. 在计划一个共同的休息日活动时，你们通常是？", "15. 你对TA的日常习惯的接受度是？", "16. 你认为你们在生活品味或审美上的契合度？", "17. 你们会如何对待彼此的“专属时刻”？", "18. 你们的居家“噪音”程度？",
    "19. 你们分享“未来规划”或“人生目标”的频率？", "20. 你向TA倾诉秘密或内心脆弱时的感受是？", "21. TA向你表达困难时，你的倾听方式是？", "22. 你们在沟通中对“沉默”的理解是？", "23. 你们讨论敏感或严肃话题时的效果如何？", "24. 你们之间是否存在只有彼此才懂的“私密语言”？", "25. 描述一下你们的沟通风格？", "26. 当TA的表达与你的认知产生冲突时，你会？", "27. 在一天的忙碌结束后，你们的“分享时刻”质量是？",
    "28. 你们解决争执的常见模式是？", "29. 你们在争吵后会进行情绪“善后”吗？", "30. 你认为你们处理冲突的效率是？", "31. 在设置“个人边界”时，你们的态度是？", "32. 当你们争执不下时，采取的行动是？", "33. 你们是否将冲突视为“增进了解”的机会？", "34. 你们在“认错”这件事上的主动性如何？", "35. 对于过去发生的、未完全解决的矛盾，你们是？", "36. 你们会如何对待彼此的“底线”或“原则”？",
    "37. 在亲密互动中，你们对彼此“身体语言”的捕捉能力是？", "38. 你们对“禁忌探索”或“特殊偏好”的开放程度？", "39. 你认为你们在亲密层面的“节奏”或“偏好”同步性？", "40. 亲密关系结束后，你们的“余韵”处理方式是？", "41. 你们讨论“性健康”或“亲密需求”时的坦诚度？", "42. 你在亲密关系中感到最重要的一点是？", "43. 在亲密互动时，你们会互相赞美或表达肯定吗？", "44. 你们在亲密关系中，谁是“主动方”？", "45. 亲密关系对你们整体感情的提升作用是？"
];

const dimNames = ["情感共振", "日常仪式", "沟通深度", "冲突处理", "亲密契合"];
const commonOptions = [
    { text: "A. 完全符合 / 总是如此", score: 4 },
    { text: "B. 比较符合 / 经常如此", score: 3 },
    { text: "C. 一般 / 偶尔如此", score: 2 },
    { text: "D. 不符合 / 很少如此", score: 1 }
];

// 2. 内容库
const contentDB = {
    results: [
        { min: 85, title: "神的杰作：双生火焰", type: "high", summary: "你们的适配度已突破天际，是上古神话中失散的另一半。在一起就是“完美”二字的官方认证。", personality: "安全型依恋", pattern: "滋养共生模式" },
        { min: 70, title: "王牌搭档：默契顶配", type: "high", summary: "你们是感情世界里的“顶级配置”，心有灵犀，一个眼神就懂。所有小问题都能高效处理。", personality: "安全-独立型", pattern: "高效协作模式" },
        { min: 55, title: "快乐合伙人：互相驯服", type: "mid", summary: "你们各有锋芒，但这份差异是火花而非阻碍。需要时间磨合，一旦驯服成功，潜力无限。", personality: "焦虑-矛盾型", pattern: "追逐-磨合模式" },
        { min: 40, title: "互相试探：走钢丝", type: "low", summary: "你们关系很不稳定，稍有不慎就会跌落。需要小心翼翼地沟通，每一步都是考验。", personality: "恐惧-回避型", pattern: "防御性试探模式" },
        { min: 0, title: "虚空独舞：人鬼情未了", type: "low", summary: "你的爱是实打实的，但TA的参与度仿佛一个“虚影”。适配度低得可怜，需要冷静。", personality: "疏离型", pattern: "断联-幻想模式" }
    ],
    details: {
        high: {
            suggestions: ["继续保持“情感账户”的高频储蓄", "共同创造一个新的长期愿景", "尝试一项全新的共同冒险"],
            flow: [{step:1,text:"根源:安全基石"},{step:2,text:"认知:善意归因"},{step:3,text:"情绪:正向循环"},{step:4,text:"行为:螺旋上升"}],
            expert: "你们是关系的幸运儿。专家的建议是：居安思危。尝试探索彼此更深层的精神世界。",
            security: ["建立只属于你们的神圣时刻", "毫无保留地展示脆弱面", "共同实现一个长期梦想"],
            health: { int: 95, pas: 90, com: 98, text: "极佳状态。关系三角非常稳固。" },
            timeline: [
                { week: "第1周", items: ["互写一封感谢信", "回顾3个高光时刻"] },
                { week: "第2周", items: ["制定3年愿景板", "双人挑战活动"] },
                { week: "第3周", items: ["练习双人冥想", "深入探讨价值观"] },
                { week: "第4周", items: ["为对方做件暖心事", "策划一次惊喜约会"] }
            ]
        },
        mid: {
            suggestions: ["停止试图改变对方", "建立明确的冲突暂停机制", "每天15分钟无目的温情交流"],
            flow: [{step:1,text:"根源:需求差异"},{step:2,text:"认知:计较得失"},{step:3,text:"情绪:爱恨交织"},{step:4,text:"行为:波折前进"}],
            expert: "你们正处于磨合期。专家建议：将“差异”视为资源。学会用“非暴力沟通”表达需求。",
            security: ["信守每一个微小承诺", "主动分享日程减少猜忌", "冲突后不带评判复盘"],
            health: { int: 65, pas: 75, com: 60, text: "亚健康状态。需要有意识地进行投入和修复。" },
            timeline: [
                { week: "第1周", items: ["记录情绪日记", "练习暂停机制"] },
                { week: "第2周", items: ["使用'我感到'句式", "20分钟专注陪伴"] },
                { week: "第3周", items: ["固定约会之夜", "交换一个秘密"] },
                { week: "第4周", items: ["冲突后24h复盘", "制定共同小目标"] }
            ]
        },
        low: {
            suggestions: ["停止所有指责和翻旧账", "从微小共同点重建信任", "认真评估是否需要专业咨询"],
            flow: [{step:1,text:"根源:创伤触发"},{step:2,text:"认知:灾难思维"},{step:3,text:"情绪:防御激活"},{step:4,text:"行为:能量耗竭"}],
            expert: "当务之急是止血。专家建议：降低期待，专注自我关怀。先修复自己，再审视关系。",
            security: ["约定语言底线", "从非性肢体接触开始", "各自进行心理咨询"],
            health: { int: 35, pas: 40, com: 30, text: "警戒状态。关系处于脆弱边缘，需紧急干预。" },
            timeline: [
                { week: "第1周", items: ["列出伤害性禁语", "进行自我肯定"] },
                { week: "第2周", items: ["主动拥抱20秒", "协作完成家务"] },
                { week: "第3周", items: ["阅读依恋书籍", "练习非暴力沟通"] },
                { week: "第4周", items: ["寻求伴侣咨询", "重新评估关系边界"] }
            ]
        }
    },
    zodiacs: {
        "Aries": { name: "白羊座", tags: ["热情", "冲动"], text: "你像火一样直接，在关系中需要即时反馈。" },
        "Taurus": { name: "金牛座", tags: ["稳重", "固执"], text: "你重视感官享受和安全感，慢热但长情。" },
        "Gemini": { name: "双子座", tags: ["多变", "有趣"], text: "沟通是你的命门，需要智力上的势均力敌。" },
        "Cancer": { name: "巨蟹座", tags: ["敏感", "顾家"], text: "你有着坚硬的外壳和柔软的心，极需情绪安全。" },
        "Leo": { name: "狮子座", tags: ["霸气", "忠诚"], text: "你需要被崇拜和关注，爱得热烈且慷慨。" },
        "Virgo": { name: "处女座", tags: ["完美", "细节"], text: "你的爱藏在细节里，通过服务对方来表达。" },
        "Libra": { name: "天秤座", tags: ["优雅", "纠结"], text: "你追求关系的和谐与平衡，害怕冲突。" },
        "Scorpio": { name: "天蝎座", tags: ["深情", "占有"], text: "你的爱是极致的融合，容不得一丝背叛。" },
        "Sagittarius": { name: "射手座", tags: ["自由", "乐观"], text: "你需要像风一样的自由，爱是共同探索世界。" },
        "Capricorn": { name: "摩羯座", tags: ["务实", "责任"], text: "你用行动代替言语，是关系中最坚实的依靠。" },
        "Aquarius": { name: "水瓶座", tags: ["独立", "独特"], text: "你需要精神上的共鸣和极大的个人空间。" },
        "Pisces": { name: "双鱼座", tags: ["浪漫", "包容"], text: "你是为爱而生的梦想家，容易与对方情绪共生。" }
    }
};

let state = {
    code: "", mode: "", info: {},
    qIdx: 0, scores: [0, 0, 0, 0, 0], totalScore: 0, answers: []
};

// 逻辑控制
function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    window.scrollTo(0, 0);
}
function showAlert(msg) {
    document.getElementById('alert-msg').innerText = msg;
    document.getElementById('alert-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function openModal(id) { document.getElementById(id).style.display = 'flex'; }

// --- 核心修改：严格校验验证码 ---
async function verifyCode() {
    const val = document.getElementById('code-input').value.trim();
    if(!val) return showAlert("请输入验证码");
    
    // 如果DB未连接，由于无法校验，只能提示网络错误并拦截（严格模式）
    // 或者您可以选择放行（state.code = val; showView('mode');），取决于您是否希望离线也能用
    // 下面是【严格模式】：必须连网校验
    if (!db) {
        // 如果您希望离线也能测试，请取消注释下一行，并注释掉 return showAlert
        // state.code = val; showView('mode'); return; 
        return showAlert("无法连接服务器，请检查网络");
    }

    try {
        const { data, error } = await db.from('access_codes').select('*').eq('code', val).single();
        
        // 1. 查不到或数据库报错
        if (error || !data) {
            return showAlert("验证码无效或不存在");
        }
        
        // 2. 验证码已被使用 (Strict Check)
        if (data.is_used) {
            return showAlert("此验证码已失效，请获取新码");
        }
        
        // 通过校验
        state.code = val;
        showView('mode');
        
    } catch(e) {
        console.error(e);
        return showAlert("验证过程出错，请重试");
    }
}

function selectMode(m) { state.mode = m; showView('consent'); }
let agreed = false;
function toggleAgree() {
    agreed = !agreed;
    document.getElementById('agree-dot').style.display = agreed ? 'block' : 'none';
    document.getElementById('agree-radio').style.borderColor = agreed ? '#F04E6E' : '#ccc';
}
function confirmConsent() {
    if(!agreed) return showAlert("请先同意协议");
    showView('info');
}

function selectRadio(group, val, el) {
    state.info[group] = val;
    el.parentElement.querySelectorAll('.custom-radio').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
}
function submitInfo() {
    const zodiac = document.getElementById('zodiac-select').value;
    if(!state.info.age || !state.info.gender || !state.info.status || !zodiac) {
        return showAlert("请完整填写信息");
    }
    state.info.zodiac = zodiac;
    startQuiz();
}

function startQuiz() {
    state.qIdx = 0; state.totalScore = 0; state.scores = [0,0,0,0,0];
    showView('quiz');
    renderQuestion();
}

// 渲染答题卡
function renderGrid() {
    const box = document.getElementById('answer-grid-box');
    if(!box) return;
    box.innerHTML = '';
    for (let i = 0; i < 45; i++) {
        const div = document.createElement('div');
        div.className = 'grid-cell';
        div.innerText = i + 1;
        if (i === state.qIdx) div.classList.add('active');
        else if (i < state.qIdx) div.classList.add('done');
        box.appendChild(div);
    }
}

function renderQuestion() {
    const idx = state.qIdx;
    const dimIdx = Math.floor(idx / 9);
    
    document.getElementById('current-q').innerText = idx + 1;
    document.getElementById('progress-bar').style.width = ((idx / 45) * 100) + "%";
    document.getElementById('dim-name-display').innerText = dimNames[dimIdx] + "量表";
    document.getElementById('dim-progress-display').innerText = `第 ${(idx % 9) + 1} / 9 题`;
    document.getElementById('q-text').innerText = questions[idx];
    
    renderGrid();

    const box = document.getElementById('options-box');
    box.innerHTML = "";
    document.getElementById('btn-next').disabled = true;

    commonOptions.forEach((opt) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `<div class="option-circle"></div><div style="font-size:15px;">${opt.text}</div>`;
        div.onclick = () => {
            box.querySelectorAll('.option-item').forEach(d => d.classList.remove('selected'));
            div.classList.add('selected');
            state.answers[idx] = opt.score;
            document.getElementById('btn-next').disabled = false;
            setTimeout(() => nextQuestion(), 250);
        };
        box.appendChild(div);
    });
    document.getElementById('btn-prev').style.visibility = idx === 0 ? 'hidden' : 'visible';
}

function nextQuestion() {
    const score = state.answers[state.qIdx];
    if(!score) return;
    const dimIdx = Math.floor(state.qIdx / 9);
    state.scores[dimIdx] += score;
    state.totalScore += score;

    if(state.qIdx < 44) {
        state.qIdx++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if(state.qIdx > 0) {
        const prevScore = state.answers[state.qIdx - 1];
        const dimIdx = Math.floor((state.qIdx - 1) / 9);
        state.scores[dimIdx] -= prevScore;
        state.totalScore -= prevScore;
        state.qIdx--;
        renderQuestion();
    }
}

function finishQuiz() { 
    // 核销验证码
    if (db && state.code) {
        try { 
            db.from('access_codes').update({is_used: true}).eq('code', state.code).then(({ error }) => {
                if(error) console.error("核销失败", error);
            }); 
        } catch(e) { console.error("核销异常", e); }
    }
    renderResult(); 
}

// 结果渲染 (带防白屏保护)
function renderResult() {
    showView('result');
    window.scrollTo(0, 0);

    let final = Math.round((state.totalScore - 45) / 135 * 100);
    if(isNaN(final) || final < 0) final = 0; if(final > 100) final = 100;
    
    const resData = contentDB.results.find(r => final >= r.min) || contentDB.results[4];
    const details = contentDB.details[resData.type];

    try {
        document.getElementById('res-score').innerText = final;
        document.getElementById('res-level').innerText = resData.title;
        document.getElementById('res-summary').innerText = resData.summary;
        setTimeout(() => { 
            const slider = document.getElementById('res-slider');
            if(slider) slider.style.left = final + "%"; 
        }, 500);
    } catch(e) { console.error(e); }

    try {
        const sugBox = document.getElementById('box-suggestions');
        if(sugBox && details.suggestions) {
            sugBox.innerHTML = details.suggestions.map(s => 
                `<div class="list-box"><div class="list-icon-bg"><i class="fas fa-check"></i></div><div style="font-size:13px;">${s}</div></div>`
            ).join('');
        }
    } catch(e) { console.error(e); }

    try {
        const dimBox = document.getElementById('box-dimensions');
        if(dimBox) {
            dimBox.innerHTML = "";
            dimNames.forEach((n, i) => {
                let s = state.scores[i] || 0;
                let dVal = Math.round((s - 9) / 27 * 100);
                if(dVal < 0) dVal = 0;
                dimBox.innerHTML += `
                    <div class="capsule"><div style="flex:1;">
                        <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:bold;"><span>${n}</span><span>${dVal}分</span></div>
                        <div class="capsule-bar"><div class="progress-fill" style="width:${dVal}%"></div></div>
                    </div></div>`;
            });
        }
    } catch(e) { console.error(e); }

    try {
        if(details) {
            document.getElementById('box-personality').innerHTML = `<h3 style="color:var(--primary);margin-bottom:5px;">${resData.personality}</h3><p style="font-size:12px;color:#666;">基于作答模式分析</p>`;
            document.getElementById('box-patterns').innerHTML = `<div class="list-box"><div class="list-icon-bg"><i class="fas fa-sync"></i></div><div><h4>${resData.pattern}</h4><p style="font-size:12px;color:#666;">当前显著互动特征</p></div></div>`;
            document.getElementById('box-expert').innerHTML = `<p style="font-size:13px;color:#555;">${details.expert}</p>`;
            document.getElementById('box-flow').innerHTML = details.flow.map((f, i) => `<div style="background:#f9f9f9;padding:10px;margin-bottom:5px;border-radius:8px;font-size:12px;"><strong>${f.step}.</strong> ${f.text}</div>`).join('');
            document.getElementById('box-security').innerHTML = details.security.map(s => `<div class="list-box"><div class="list-icon-bg" style="background:#E3F2FD;color:#2196F3;"><i class="fas fa-shield-alt"></i></div><div style="font-size:13px;">${s}</div></div>`).join('');
            
            const h = details.health;
            document.getElementById('box-health').innerHTML = `
                <div class="capsule"><div style="flex:1;"><div style="display:flex; justify-content:space-between; font-size:10px;"><span>亲密</span><span>${h.int}%</span></div><div class="capsule-bar"><div class="progress-fill" style="width:${h.int}%; background:#33691E;"></div></div></div></div>
                <div class="capsule"><div style="flex:1;"><div style="display:flex; justify-content:space-between; font-size:10px;"><span>激情</span><span>${h.pas}%</span></div><div class="capsule-bar"><div class="progress-fill" style="width:${h.pas}%; background:#33691E;"></div></div></div></div>
            `;
            document.getElementById('text-health-summary').innerText = h.text;
            
            document.getElementById('box-timeline').innerHTML = details.timeline.map(t => 
                `<div style="position:relative; padding-left:20px; margin-bottom:20px; border-left:2px solid #eee;">
                    <div style="font-weight:bold;font-size:14px;color:var(--primary);">${t.week}</div>
                    ${t.items.map(i=>`<div style="font-size:12px;color:#555;">• ${i}</div>`).join('')}
                </div>`
            ).join('');
        }
    } catch(e) { console.error(e); }

    try {
        const userZodiac = state.info.zodiac || "Aries"; 
        const zData = contentDB.zodiacs[userZodiac];
        if(zData) {
            document.getElementById('box-zodiac').innerHTML = `
                <div style="text-align:center;">
                    <h3 style="color:var(--purple-text);">${zData.name}</h3>
                    <div style="margin:10px 0;">${zData.tags.map(t=>`<span style="font-size:10px;background:white;padding:4px 8px;border-radius:10px;margin:2px;color:var(--purple-text);">${t}</span>`).join('')}</div>
                    <p style="font-size:12px;color:var(--purple-text);opacity:0.8;">${zData.text}</p>
                </div>`;
        }
    } catch(e) { console.error(e); }

    document.getElementById('session-id').innerText = Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('finish-time').innerText = new Date().toLocaleDateString();

    try {
        const ctx = document.getElementById('radarChart');
        if(window.myRadar) window.myRadar.destroy();
        if(typeof Chart !== 'undefined' && ctx) {
            window.myRadar = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: dimNames,
                    datasets: [{
                        label: '得分',
                        data: state.scores.map(s => (s-9)/27*100),
                        backgroundColor: 'rgba(240, 78, 110, 0.2)',
                        borderColor: '#F04E6E',
                        pointBackgroundColor: '#F04E6E'
                    }]
                },
                options: {
                    scales: { r: { min: 0, max: 100, ticks: { display: false } } },
                    plugins: { legend: { display: false } }
                }
            });
        }
    } catch(e) { console.error(e); }
}

function generatePoster() {
    const modal = document.getElementById('share-modal');
    openModal('share-modal');
    document.getElementById('poster-loading').style.display = 'block';
    document.getElementById('poster-img').style.display = 'none';
    document.getElementById('poster-tip').style.display = 'none';
    document.querySelector('.bottom-bar').style.display = 'none';
    window.scrollTo(0,0);

    setTimeout(() => {
        html2canvas(document.querySelector("#view-result"), {
            scale: 2, useCORS: true, allowTaint: true, scrollY: 0, backgroundColor: '#FAFAFA',
            onclone: (clonedDoc) => {
                const c = clonedDoc.getElementById('view-result');
                c.classList.add('snapshot-mode');
                c.style.height = 'auto';
                c.style.overflow = 'visible';
            }
        }).then(canvas => {
            document.getElementById('poster-img').src = canvas.toDataURL("image/png");
            document.getElementById('poster-loading').style.display = 'none';
            document.getElementById('poster-img').style.display = 'block';
            document.getElementById('poster-tip').style.display = 'flex';
            document.querySelector('.bottom-bar').style.display = 'flex';
        }).catch(err => {
            console.error(err);
            document.getElementById('poster-loading').innerText = "生成失败，请截屏分享";
            document.querySelector('.bottom-bar').style.display = 'flex';
        });
    }, 500);
}