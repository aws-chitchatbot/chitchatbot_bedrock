// 창넓이, 높이 구하기
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

document.documentElement.style.setProperty('--windowWidth', windowWidth + 'px');
document.documentElement.style.setProperty('--windowHeight', windowHeight + 'px');

// 채팅방 추가
document.getElementById("addchatroomBtn").addEventListener("click", function() {
    // 새로운 div 요소 생성
    var newDiv = document.createElement("div");
    // "flex-box3" 클래스를 추가
    newDiv.classList.add("flex-box3");
    // 생성된 div에 텍스트 추가
    var textNode = document.createTextNode("New Div");
    newDiv.appendChild(textNode);
    // 생성된 div를 container 요소의 자식으로 추가
    document.getElementById("chatroomList").appendChild(newDiv);
});
