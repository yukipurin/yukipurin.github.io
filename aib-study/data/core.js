(() => {
'use strict';
const guide='https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.pdf';
const sources={
  guide,
  bedrock:'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html',
  rag:'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html',
  guard:'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html',
  guardPii:'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html',
  comprehend:'https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html',
  macie:'https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html',
  budgets:'https://docs.aws.amazon.com/cost-management/latest/userguide/budget-methods.html',
  serviceCatalog:'https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html',
  sage:'https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-mlconcepts.html',
  quick:'https://docs.aws.amazon.com/quick/latest/userguide/what-is.html',
  caf:'https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/business-perspective.html',
  lens:'https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html',
  shared:'https://aws.amazon.com/compliance/shared-responsibility-model/',
  calc:'https://calculator.aws/',
  cost:'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html',
  market:'https://aws.amazon.com/marketplace/',
  iso42001:'https://www.iso.org/standard/42001',
  iso23053:'https://www.iso.org/standard/74438.html'
};
const bank=[];
function add(id,task,source,stem,choices,correctCount){
  if(!sources[source]||!Array.isArray(choices)||choices.length!==(correctCount===2?5:4))throw Error(id);
  const parsed=choices.map(v=>{const pos=v.indexOf('|');if(pos<0)throw Error(id);return {text:v.slice(0,pos),note:v.slice(pos+1)}});
  let seed=0;for(const ch of id)seed=(seed*31+ch.charCodeAt(0))>>>0;
  const order=parsed.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--){seed=(1664525*seed+1013904223)>>>0;const j=seed%(i+1);[order[i],order[j]]=[order[j],order[i]]}
  const options=order.map((n,i)=>({id:'o'+i,text:parsed[n].text,note:parsed[n].note}));
  bank.push({
    id,domain:({F:'fundamentals',S:'strategy',G:'governance',T:'transformation'})[id[0]],
    skill:task,stem,options,correct:order.map((n,i)=>n<correctCount?'o'+i:null).filter(Boolean),
    source:sources[source],sources:[...new Set([sources[source],guide])],guide,
    review:parsed.slice(0,correctCount).map(x=>x.text+'。'+x.note).join(' ')
  });
}
window.AIB_Q=(id,task,source,stem,choices)=>add(id,task,source,stem,choices,1);
window.AIB_M=(id,task,source,stem,choices)=>add(id,task,source,stem,choices,2);
window.AIB_BANK=bank;
window.AIB_SOURCES=sources;
})();
