//프로미스 체이닝보단 간편하고 가독성 좋은 API
//이처럼 기존 있던 API에 덧붙혀 업그레이드 한것은 == syntatic Sugar

//async & await
//프로미스보다 깔끔

//@@@@@@@@@@@@@    1. async 쓰는법
function fetchUser() {
  //백엔드에서 가져오는 함수라고 가정하자(10초걸린다고 가정)
  return new Promise((resolve, reject) => {
    resolve("ellie");
  });
}

const user = fetchUser();
user.then(console.log);
console.log(user);
// 동기적인 처리가 되기 때문에 백엔드에서 데이터 가져올때까지
// 텅빈화면만 10초동안 나올듯
// 고로, 비동기로 만들어야 함(지난 시간에 Promise로 만듦)

// Promise 말고 async는 그냥 함수앞에 키워드만 쓰면
// 코드블록이 자동으로 프로미스로 바뀜 아래와 같이

async function fetchUser() {
  ㅌ;
  //백엔드에서 가져오는 함수라고 가정하자(10초걸린다고 가정)
  //   return new Promise((resolve, reject) => {
  //     resolve("ellie");
  //   });
  // }
  return "ellie";
}

const user = fetchuser();
user.then(console.log);
console.log(user);

// @@@@@@@@@@@@@@@@    2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000); //await은 async함수 안에서만 ㄱㄴ
  //delay 전달받고 await 쓰면 딜레이 끝날때까지 기다려줌
  return "사과";
}

async function getBanana() {
  await delay(1000); //얘도 3초있다가
  return "바나나";
}

function pickFruits() {
  return getApple().then((apple) => {
    return getBanana() //
      .then((banana) => `${apple} + ${banana}`);
  });
}

pickFruits().then(console.log);

// 프로미스체이닝도 많이하면 콜백지옥과 비슷==>아래async사용

async function pickFruits() {
  const applePromise = getApple(); //추가
  const bananaPromise = getBanana(); //추가
  const apple = await applePromise; //getApple();//동기화
  const banana = await bananaPromise; //getBanana();//동기화
  return `${apple} + ${banana}`;
}

//ㅈㄴ 난잡한데 ==> 프로미스 API 사용하자 :3번

pickFruits().then(console.log);

//같은 결과값 :사과 바나나

//에러 처리는 try catch 사용
//try {받아온 값에} catch(){}

//하지만 받아올 때 따로 받아오면 딜레이 두배라서
//만들자마자 실행되는 변수Promise 적용.(위에 확인)

//@@@@@@@@@@@@ 3. useful Promise APIs
//  1) PromiseAll

function pickAllFruits() {
  return (
    Promise.all([getApple(), getBanana()])
      //promise배열 전달하면 모든 프로미스들이
      //병렬적으로 다 받을 때까지 모아주는 애
      .then((fruits) => fruits.join(" + ")) //배열을스트링으로 묶을 수 있는거 == join메소드
  );
}
pickAllFruits().then(console.log);

//혹시 먼저 도착한 첫번째 것만 받아오고 싶다면?  race API
function pickFirst() {
  return Promise.race([getApple(), getBanana()]);
}

pickFirst().then(console.log);
