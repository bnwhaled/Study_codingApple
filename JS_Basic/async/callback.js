"use strict";

//JS is synchronous. 동기적인아이다
// Excute the code block by order after hoisting
// hoisting : var변수 함수 선언문 제일 올라가는 거

// setTimeout(function () {
//   console.log("2");
// }, 1000); 아래는 화살표버전

// 1, 2, 3 --> 동기적으로 정해진 순서에 맞게
// 비동기적 --> 언제 호출될지 모르는거

console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("2");
//synchronous callback
function printImmediately(print) {
  print();
}

printImmediately(() => console.log("hello"));

//Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

//순서
//1. 함수 선언된거 싹다 호이스팅
//2. 동기 콘솔 1, 2 추력
//3.setTime은 WebApI-태스크큐로
//4.printimmediately hello  선언됬으니 출력
//5.6 다끝난후settime 들 초수 순서로 실행

//콜백지옥체험
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    //로그인(아디비번), 성공적으로 이뤄지면, 실패하면 이런 콜백함수 호출
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no acess"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {}
    );
  },
  (error) => {
    console.log(error);
  }
);
