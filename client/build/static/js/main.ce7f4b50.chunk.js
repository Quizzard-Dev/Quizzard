(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var a,r,c,s,o=n(3),i=n.n(o),l=n(64),u=n.n(l),d=(n(100),n(5)),b=n(12),j=n(40),x=n(88),p=n(134),h=n(135),m=n(132),O=n(84),f=n(51),g=n(87),w=n(15),v=n(65),y=n.n(v),k=n(35),N=n(36),q=n(24),C=n.n(q),S=n(39),z=n(139),I=n(77),_=n(78),T=n(66),Q=new(function(){function e(){Object(I.a)(this,e)}return Object(_.a)(e,[{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"isTokenExpired",value:function(e){return Object(T.a)(e).exp<Date.now()/1e3&&(localStorage.removeItem("id_token"),!0)}},{key:"getProfile",value:function(){return Object(T.a)(this.getToken())}},{key:"loggedIn",value:function(){var e=this.getToken();return!(!e||this.isTokenExpired(e))}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/home")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),window.location.assign("/")}}]),e}()),$=n(31),E=n(136),A=Object(E.a)(a||(a=Object($.a)(["\n    mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n        user {\n          _id\n          username\n        }\n        token\n  }\n}\n"]))),L=Object(E.a)(r||(r=Object($.a)(["\n    mutation createUser($email: String!, $username: String!, $password: String!) {\n     addUser(email: $email, username: $username, password: $password) {\n         user {\n              _id\n              username\n             }\n         token\n  }\n}\n"]))),D=Object(E.a)(c||(c=Object($.a)(["\n    mutation createQuiz($input: QuizInput!) {\n  createQuiz(input: $input) {\n    title\n    _id\n    createdAt\n    author\n    questions {\n      questionText\n      answers {\n        answerText\n        isCorrect\n      }\n    }\n  }\n}\n"]))),F=Object(E.a)(s||(s=Object($.a)(["\n  mutation deleteQuiz($quizId: ID!) {\n    deleteQuiz(quizId: $quizId) {\n      title\n      _id\n      author\n    }\n  }\n"]))),P=n(1);function R(){var e=Object(o.useState)({email:"",password:""}),t=Object(w.a)(e,2),n=t[0],a=t[1],r=Object(z.a)(A),c=Object(w.a)(r,1)[0],s=function(){var e=Object(S.a)(C.a.mark((function e(t){var r,s;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,c({variables:Object(d.a)({},n)});case 4:if(r=e.sent,s=r.data){e.next=8;break}throw new Error("Something went wrong!");case 8:Q.login(s.login.token),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:a({email:"",password:""});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();return Object(P.jsx)("div",{children:Object(P.jsxs)("form",{className:"p-3",onSubmit:function(e){return s(e)},children:[Object(P.jsx)("input",{value:n.email,onChange:function(e){return a(Object(d.a)(Object(d.a)({},n),{},{email:e.target.value}))},type:"email",className:"w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full",placeholder:"john@website.com"}),Object(P.jsx)("input",{value:n.password,onChange:function(e){return a(Object(d.a)(Object(d.a)({},n),{},{password:e.target.value}))},type:"password",className:"w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full",placeholder:"password"}),Object(P.jsx)("button",{type:"submit",className:"w-full px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform",children:"Submit"})]})})}function U(){var e=Object(o.useState)({username:"",email:"",password:""}),t=Object(w.a)(e,2),n=t[0],a=t[1],r=Object(z.a)(L),c=Object(w.a)(r,1)[0],s=function(){var e=Object(S.a)(C.a.mark((function e(t){var r,s;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,c({variables:Object(d.a)({},n)});case 4:if(r=e.sent,s=r.data){e.next=8;break}throw new Error("something went wrong!");case 8:Q.login(s.addUser.token),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:a({username:"",email:"",password:""});case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();return Object(P.jsx)("div",{children:Object(P.jsxs)("form",{className:"p-3",onSubmit:function(e){return s(e)},children:[Object(P.jsx)("input",{value:n.username,onChange:function(e){return a(Object(d.a)(Object(d.a)({},n),{},{username:e.target.value}))},type:"text",className:"w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full",placeholder:"username"}),Object(P.jsx)("input",{value:n.email,onChange:function(e){return a(Object(d.a)(Object(d.a)({},n),{},{email:e.target.value}))},type:"email",className:"w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full",placeholder:"john@website.com"}),Object(P.jsx)("input",{value:n.password,onChange:function(e){return a(Object(d.a)(Object(d.a)({},n),{},{password:e.target.value}))},type:"password",className:"w-full mb-3 placeholder-gray-400 placeholder-opacity-70 px-4 py-3 rounded-full",placeholder:"password"}),Object(P.jsx)("button",{type:"submit",className:"w-full px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform",children:"Submit"})]})})}var J=n(133);function B(){var e=Object(o.useState)(!1),t=Object(w.a)(e,2),n=t[0],a=t[1],r=Object(o.createRef)(),c=Object(o.createRef)();return window.onclick=function(e){e.preventDefault(),e.target!==document.querySelector(".dropdownbtn")&&a(!1)},Object(P.jsx)(P.Fragment,{children:Object(P.jsx)("div",{className:"flex flex-wrap px-4",children:Object(P.jsxs)("div",{className:"relative inline-flex align-middle w-full",children:[Object(P.jsxs)("button",{className:"text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dropdownbtn bg-theme-darker",type:"button",ref:r,onClick:function(){n?a(!1):(Object(J.a)(r.current,c.current,{placement:"bottom-start"}),a(!0))},children:[Q.getProfile().data.username," ",Object(P.jsx)(k.a,{icon:N.a})]}),Object(P.jsxs)("div",{ref:c,className:(n?"block ":"hidden ")+"bg-theme-darker text-base z-50 py-1 list-none text-center rounded shadow-lg mt-1",style:{minWidth:"12rem"},children:[Object(P.jsx)(j.b,{to:"/home",children:Object(P.jsx)("a",{href:"/home",className:"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent",children:"Home"})}),Object(P.jsx)(j.b,{to:"/creator",children:Object(P.jsx)("a",{href:"/creator",className:"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent",children:"Creator"})}),Object(P.jsx)("a",{href:"/home",className:"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent",onClick:function(e){return e.preventDefault()},children:"Something else here"}),Object(P.jsx)("div",{className:"h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"}),Object(P.jsx)("a",{href:"/home",className:"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent",children:Object(P.jsx)("button",{className:"px-4 py-3 bg-red-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform",onClick:Q.logout,children:"Logout"})})]})]})})})}var M={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",display:"inline",textAlign:"right"}};function Y(){var e=Object(o.useState)(!1),t=Object(w.a)(e,2),n=t[0],a=t[1],r=Object(o.useState)("login-radio"),c=Object(w.a)(r,2),s=c[0],i=c[1];function l(){a(!1)}function u(e){console.log(e.target)}return Object(P.jsxs)("div",{className:"mx-auto flex items-center justify-between bg-theme-main p-6",children:[Object(P.jsx)("div",{children:Object(P.jsx)(j.b,{to:"/",children:Object(P.jsx)("a",{className:"tracking-widest",as:j.b,href:"/",children:"Quizzard"})})}),Object(P.jsx)("div",{className:"flex",children:Q.loggedIn()?Object(P.jsx)(P.Fragment,{children:Object(P.jsx)(B,{})}):Object(P.jsx)(P.Fragment,{children:Object(P.jsx)("button",{className:"openModal text-center",onClick:function(){a(!0)},children:"Log In | Sign Up"})})}),Object(P.jsxs)(y.a,{isOpen:n,onRequestClose:l,style:M,shouldReturnFocusAfterClose:!1,shouldCloseOnOverlayClick:!0,contentLabel:"Login/Signup Modal",children:[Object(P.jsx)("button",{className:"text-center",onClick:l,children:Object(P.jsx)(k.a,{icon:N.b,size:"2x"})}),Object(P.jsx)("form",{children:Object(P.jsxs)("fieldset",{className:"text-center space-x-4",children:[Object(P.jsxs)("label",{children:[Object(P.jsx)("input",{id:"login-radio",checked:"login-radio"===s,value:"login-radio",onClick:function(){return i("login-radio")},onChange:u,name:"modalRadio",type:"radio"})," Log In"]}),Object(P.jsxs)("label",{children:[Object(P.jsx)("input",{id:"signup-radio",checked:"signup-radio"===s,value:"signup-radio",onClick:function(){return i("signup-radio")},onChange:u,name:"modalRadio",type:"radio"})," Sign Up"]})]})}),Object(P.jsx)("div",{children:"login-radio"===s?Object(P.jsx)(R,{}):Object(P.jsx)(U,{})})]})]})}function G(){return Object(P.jsx)("div",{children:"Splash"})}y.a.setAppElement(document.getElementById("root"));var H,W,K,V,X,Z=n(137),ee=(Object(E.a)(H||(H=Object($.a)(["\n    query users {\n        users {\n            _id\n            username\n        }\n    }\n"]))),Object(E.a)(W||(W=Object($.a)(["\n    query user($userId: ID!) {\n        user(userId: $userId) {\n            username\n            quizzes {\n                title\n                questions {\n                    questionText\n                    answers {\n                        answerText\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n"]))),Object(E.a)(K||(K=Object($.a)(["\n    query quizzes {\n        quizzes {\n            _id\n            title\n            author\n        }\n    }\n"]))),Object(E.a)(V||(V=Object($.a)(["\n    query quiz($quizId: ID!) {\n        quiz(quizId: $quizId) {\n            _id\n            title\n            author\n            questions {\n                questionText\n                answers {\n                    answerText\n                    isCorrect\n                }\n            }\n        }\n    }\n"]))),Object(E.a)(X||(X=Object($.a)(["\n    query me {\n        me {\n            _id\n            username\n            quizzes {\n                _id\n                title\n                questions {\n                    questionText\n                    index\n                    answers {\n                        answerText\n                        index\n                        isCorrect\n                    }\n                }\n            }\n        }\n    }\n"]))));function te(){var e=Object(z.a)(F),t=Object(w.a)(e,1)[0],n=Object(o.useState)(!1),a=Object(w.a)(n,2),r=a[0],c=a[1],s=Object(Z.a)(ee),i=s.loading,l=s.data,u=(s.error,s.refetch);Object(o.useEffect)((function(){u()}),[l]);var d=(null===l||void 0===l?void 0:l.me.quizzes)||{};if(i)return Object(P.jsx)("h2",{className:"text-xl font-bold",children:"Loading"});function j(){return(j=Object(S.a)(C.a.mark((function e(n,a){var r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.stopPropagation(),e.next=3,t({variables:{quizId:n._id}});case 3:r=e.sent,r.data&&u();case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r?Object(P.jsx)(b.a,{to:"/creator"}):Object(P.jsxs)("div",{className:"mx-auto container bg-yellow-200 rounded p-3",children:[Object(P.jsx)("h2",{className:"text-lg mb-5 font-semibold",children:"Quiz List"}),d.length?Object(P.jsxs)("div",{children:[Object(P.jsx)("span",{children:"You have ".concat(d.length," Saved Quizzes")}),Object(P.jsx)("div",{className:"mt-5 flex flex-col space-y-3 container",children:d.map((function(e){return Object(P.jsxs)("div",{onClick:function(){return function(e){localStorage.setItem("quiz",JSON.stringify(e)),c(!0)}(e)},className:"flex justify-between container rounded bg-red-500 hover:bg-red-700 hover:shadow-sm transition duration-200 px-2 py-1",children:[Object(P.jsx)("span",{children:e.title}),Object(P.jsx)("div",{className:"px-1",onClick:function(t){return function(e,t){return j.apply(this,arguments)}(e,t)},children:Object(P.jsx)("span",{children:Object(P.jsx)(k.a,{icon:N.b})})})]})}))})]}):"You have No Saved Quizzes"]})}function ne(){return Object(P.jsxs)("div",{children:["Dashboard",Object(P.jsx)(te,{})]})}function ae(){var e=Object(z.a)(D),t=Object(w.a)(e,1)[0],n={title:"",questions:[]},a={questionText:"",answers:[],index:0},r={answerText:"",isCorrect:!1,index:0},c=localStorage.getItem("quiz")?JSON.parse(localStorage.getItem("quiz")):n;c.__typename&&(delete c.__typename,c.questions.map((function(e){return delete e.__typename,e.answers.map((function(e){return delete e.__typename,e})),e}))),c._id&&delete c._id;var s=Object(o.useState)(c),i=Object(w.a)(s,2),l=i[0],u=i[1],j=Object(o.useState)({}),x=Object(w.a)(j,2),p=x[0],h=x[1],m=Object(o.useState)({}),O=Object(w.a)(m,2),f=O[0],g=O[1],v=Object(o.useState)(!1),y=Object(w.a)(v,2),q=y[0],I=y[1];function _(){var e=l.questions;e[p.index-1]=p,u(Object(d.a)(Object(d.a)({},l),{},{questions:e})),localStorage.setItem("quiz",JSON.stringify(l))}function T(){var e=p.answers;e[f.index-1]=f,h(Object(d.a)(Object(d.a)({},p),{},{answers:e}))}function Q(){return(Q=Object(S.a)(C.a.mark((function e(){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t({variables:{input:l}});case 2:a=e.sent,a.data&&(h({}),g({}),u(n),localStorage.getItem("quiz")&&localStorage.removeItem("quiz"),I(!0));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return q?Object(P.jsx)(b.a,{to:"/home/reload"}):Object(P.jsxs)("div",{className:"bg-blue-200 rounded shadow-lg p-5 m-3",children:[Object(P.jsx)("h1",{className:"text-xl font-bold text-center",children:"Quiz Creator"}),Object(P.jsx)("form",{children:Object(P.jsx)("input",{type:"text",value:l.title,placeholder:"Title",onChange:function(e){return u(Object(d.a)(Object(d.a)({},l),{},{title:e.target.value}))}})}),Object(P.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 mt-2 gap-3",children:[Object(P.jsxs)("div",{className:"bg-red-500 rounded-lg p-3",children:[Object(P.jsx)("h2",{className:"text-lg font-bold mb-4",children:"Question List"}),Object(P.jsx)("div",{className:"space-y-2 flex flex-col",children:l.questions.length?l.questions.map((function(e){return Object(P.jsxs)("div",{onClick:function(){return function(e){_(),h(e),g({})}(e)},className:"flex flex-row justify-between container ".concat(p.index===e.index?"bg-yellow-500 shadow-md":"bg-yellow-200 hover:bg-yellow-300"," rounded p-2 transition duration-200"),children:[Object(P.jsxs)("span",{children:[Object(P.jsxs)("strong",{children:["Q",e.index,"- "]}),e.questionText]}),Object(P.jsx)("div",{onClick:function(t){return function(e,t){t.stopPropagation(),e.index===p.index&&(h({}),g({}));var n=l.questions,a=n.indexOf(e);n.splice(a,1),n.forEach((function(e,t){e.index=t+1})),u(Object(d.a)(Object(d.a)({},l),{},{questions:n}))}(e,t)},className:"px-1",children:Object(P.jsx)("span",{children:Object(P.jsx)(k.a,{icon:N.b})})})]},e.index)})):Object(P.jsx)("p",{children:"Add questions by clicking the button below"})}),Object(P.jsx)("button",{className:"mt-4 w-full rounded py-1 font-semibold hover:bg-green-700 bg-green-500 transition duration-200",onClick:function(){return function(){var e=l.questions;a.index=l.questions.length+1,e.push(a),u(Object(d.a)(Object(d.a)({},l),{},{questions:e})),console.log(l)}()},children:"Add Question"})]}),Object(P.jsxs)("div",{className:"bg-red-500 rounded-lg p-3",children:[Object(P.jsx)("h2",{className:"text-lg font-bold mb-4",children:"Question Editor"}),p.index?Object(P.jsxs)("div",{children:[Object(P.jsx)("form",{children:Object(P.jsx)("textarea",{className:"w-full rounded p-1",type:"text",value:p.questionText,placeholder:"Question",onChange:function(e){return h(Object(d.a)(Object(d.a)({},p),{},{questionText:e.target.value}))}})}),Object(P.jsxs)("div",{className:"rounded container bg-green-200 p-2 mt-3",children:[Object(P.jsx)("span",{className:"font-semibold text-lg",children:"Answers"}),Object(P.jsx)("div",{className:"space-y-2",children:p.answers.map((function(e,t){return Object(P.jsxs)("div",{onClick:function(){return function(e){T(),g(e)}(e)},className:"flex flex-row justify-between container rounded ".concat(f.index===e.index?"bg-blue-500 shadow-md":"bg-blue-300 hover:bg-blue-400 transition duration-200"," p-2"),children:[Object(P.jsxs)("span",{children:[Object(P.jsxs)("strong",{children:[e.index,". "]}),e.answerText]}),Object(P.jsxs)("div",{className:"flex",children:[Object(P.jsx)("div",{className:"px-3",children:Object(P.jsx)("input",{checked:e.isCorrect,onChange:function(t){return function(e,t){t.stopPropagation();var n=p.answers.map((function(t){return t.isCorrect=t===e,t}));console.log(n),h(Object(d.a)(Object(d.a)({},p),{},{answers:n}))}(e,t)},type:"checkbox"})}),Object(P.jsx)("div",{onClick:function(t){return function(e,t){t.stopPropagation(),e.index===f.index&&g({});var n=p.answers,a=n.indexOf(e);n.splice(a,1),n.forEach((function(e,t){e.index=t+1})),e.isCorrect&&n.length&&(n[0].isCorrect=!0),h(Object(d.a)(Object(d.a)({},p),{},{answers:n}))}(e,t)},className:"px-1",children:Object(P.jsx)("span",{children:Object(P.jsx)(k.a,{icon:N.b})})})]})]},t)}))}),Object(P.jsx)("button",{onClick:function(){return function(){var e=p.answers,t=r;t.index=p.answers.length+1,1===t.index&&(t.isCorrect=!0),e.push(t),h(Object(d.a)(Object(d.a)({},p),{},{answers:e}))}()},className:"mx-auto bg-green-500 hover:bg-green-700 py-1 font-semibold rounded w-full mt-2 transition duration-200",children:"Add Answer"})]}),Object(P.jsx)("button",{className:"mt-4 w-full rounded bg-blue-600 hover:bg-blue-800 py-1 font-semibold transition duration-200",onClick:function(){return _()},children:"Update Question"})]}):Object(P.jsx)("p",{children:"Select a question to edit"})]}),Object(P.jsxs)("div",{className:"bg-red-500 rounded-lg p-3",children:[Object(P.jsx)("h2",{className:"text-lg font-bold mb-4",children:"Answer Editor"}),f.index?Object(P.jsxs)("div",{children:[Object(P.jsx)("form",{children:Object(P.jsx)("textarea",{className:"w-full rounded p-1",type:"text",value:f.answerText,placeholder:"Answer",onChange:function(e){return g(Object(d.a)(Object(d.a)({},f),{},{answerText:e.target.value}))}})}),Object(P.jsx)("button",{className:"mt-4 w-full rounded bg-blue-600 hover:bg-blue-800 py-1 font-semibold transition duration-200",onClick:function(){return T()},children:"Update Answer"})]}):Object(P.jsx)("p",{children:"Select an answer to edit"})]})]}),Object(P.jsx)("div",{className:"text-center",children:l.questions.length>=3?Object(P.jsx)("button",{onClick:function(){return function(){return Q.apply(this,arguments)}()},className:"rounded bg-green-500 hover:bg-green-700 mx-auto font-bold text-lg mt-10 py-3 px-20 transition duration-200",children:"Create Quiz"}):null})]})}var re=Object(x.a)({uri:"/graphql"}),ce=Object(O.a)((function(e){var t=e.graphQLErrors,n=e.networkError;t&&console.log("graphQLErrors",t),n&&console.log("networkError",n)})),se=f.a.from([ce,re]),oe=Object(g.a)((function(e,t){var n=t.headers,a=localStorage.getItem("id_token");return{headers:Object(d.a)(Object(d.a)({},n),{},{authorization:a?"Bearer ".concat(a):""})}})),ie=new p.a({link:oe.concat(se),cache:new h.a});var le=function(){return Object(P.jsx)(m.a,{client:ie,children:Object(P.jsx)(j.a,{children:Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(Y,{}),Object(P.jsxs)(b.d,{children:[Object(P.jsx)(b.b,{exact:!0,path:"/",component:G}),Object(P.jsx)(b.b,{exact:!0,path:"/home",component:ne}),Object(P.jsx)(b.a,{exact:!0,from:"/home/reload",to:"/home"}),Object(P.jsx)(b.b,{path:"/creator",component:ae})]})]})})})},ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,140)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};u.a.render(Object(P.jsx)(i.a.StrictMode,{children:Object(P.jsx)(le,{})}),document.getElementById("root")),ue()}},[[122,1,2]]]);
//# sourceMappingURL=main.ce7f4b50.chunk.js.map