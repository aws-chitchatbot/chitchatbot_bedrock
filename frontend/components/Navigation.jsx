import Link from "next/link";
export default function Navigation() {

    return (
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div className="flex items-center justify-center mt-7">
                <div className="flex items-center">
                <img alt="" src="/yong_icon.png" width={"60px"} height={"45px"}></img>
                    <Link href="/">
                        <span className="mx-2 text-xl font-semibold text-white">로그인</span>
                        {/* <button class="login-btn" id="loginBtn" onclick="location.href='/login_pop.html'">
                        로그인
                        </button> */}
                    </Link>
                </div>
            </div>
            <nav className="mt-10">
                {/* <Link href="/models"
                      className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-3">Foundation Models</span>
                </Link> */}
                <Link href="/chat"
                      className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-3">Chitchatbot</span>
                </Link>
                {/* <Link href="/text"
                      className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-3">Text Playground</span>
                </Link>
                <Link href="/image"
                      className="flex items-center px-6 py-2 mt-4 text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                    <span className="mx-3">Image Playground</span>
                </Link> */}
            </nav>
        </div>
    );
}