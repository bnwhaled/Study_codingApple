"use strict";

// Promise = 동기를 비동기처리 하는 프로그램
// 동기적인 것을 수행할 때 콜백함수 대신 쓸 수 있는 obj
// 보통 heavy한 큰 데이터 받아오는 등의 일을 함(동기적으로는 힘드니까)

// 공부할 포인트
// 1. state : 무거운 기능 수행중인지, 완료해서 성공or실패했는지
// 2. producer와 consumer의 차이
// == 정보제공자 vs 정보사용자)

// state : promise 만들어져 operation 수행중일때 == pending상태
//       이걸 다 끝내면 funfilled 실패하면 rejected 상태

//   1번@@  producer부터 => promise는 클래스임

//   생성
//Promise(executor: (resolve: (value: any)  ## executor 콜백함수 전달필요
//                              ## 그콜백에 또다른 콜백 2개(resolve와 reject)
// => void, reject: (reason?: any) => void)
// => void): Promise < any >
const promise = new Promise((resolve, reject) => {
  console.log("doing something");

  //프로미스 만들자마자 콘솔실행 -- 데이터받아오는거였으면 바로받아옴
  //고로 버튼 눌렀을 때 통신해야한다면 작업 필요 *****************

  //기능 잘 수행했으면? resolve받아와
  setTimeout(() => {
    resolve("ellie");
    reject(new Error("no network"));
    //reject시 에러메시지 뿜어 ==> 대처는 catch로
  }, 2000);
});
// 2번@@ Consumers : then,catch, finally 를 이용해 성공한 값 받아올수있음
//                 promise의 프로퍼티들..........

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })

  //then : 프로미스 잘수행되면 resolve를 통해 전달한 값이
  //value파라미터로 들어오게 함

  //위의 ..점두개 프로퍼티 사용은 promise의 then 호출 후
  //리턴된 값을 다시 promise가 받음 다른 객체에서도 사용가능

  //finally 최근 추가된 프로퍼티 : 에러뜨든 말든 그냥 무조건 실행
  .finally(() => {
    console.log("finally");
  });

//@@3번. promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

//보는 바와 같이 then은 값바로 전달 또는
//또 다른 promise도 선언할 수 있다!
//그래서 다른 비동기적인 애들 처리할 수 있음!

//@@ 4번. Error Handling

//아래와 같은 프로미스가 있을때...
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("닭"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        //   resolve(`${hen} => 달걀`), 1000);
        reject(new Error(`error ${hen} => 달걀`)),
      1000
    );
  });

const getCook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 후라이`), 1000);
  });

// 여기서 닭 받아와서 Egg함수호출 이게 되면
// Cook함수 호출 이게 되면 그 값 변수에 넣어서 리턴

getHen()
  .then((hen) => getEgg(hen))
  .then((Egg) => getCook(Egg))
  .then((food) => console.log(food));

//콜백 전달 시 받아오는 value(위의 hen이나 egg)를
//다른 함수로 바로 전달하는 경우 아래와 같이 생략 가능
getHen() //
  .then(getEgg)
  .catch((error) => {
    return "계란";
  })
  .then(getCook)
  .then(console.log)
  .catch(console.log);

// 달걀 => 계란 출력됨(닭에서 데이터 주는 것 실패했을 때 코드 실행)
