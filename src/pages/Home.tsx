import DefaultButton from "../components/DefaultButton"

import bumper1 from "../assets/images/bumper1.png"
import bumper2 from "../assets/images/bumper2.png"

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-full h-full xl:w-[50vw] xl:h-[50vh] flex flex-col xl:grid xl:grid-rows-4 xl:grid-cols-6 xl:rounded-xl xl:overflow-clip items-center justify-center gap-[2%] xl:gap-x-2 xl:gap-y-2">
                <div
                    className="w-[80%] h-[15vh] xl:w-full xl:h-full flex items-center justify-center xl:row-span-2 xl:col-span-3 bg-no-repeat bg-top bg-cover group"
                    style={{ backgroundImage: `url(${bumper1})` }}
                    tabIndex={0}
                >
                    <img src="logo.png" alt="Logo" className="h-[75%] group-hover:hidden group-focus:hidden" />
                    <div className="w-full h-full hidden items-center justify-center group-hover:flex group-hover:bg-[rgba(0,0,0,0.5)] group-focus:flex group-focus:bg-[rgba(0,0,0,0.5)] transition-all duration-700">
                        <p className="text-white text-center font-bauer">Onde técnica, arte e estilo se encontram.<br/>Especialista em Anime Lashes</p>
                    </div>
                </div>
                <DefaultButton href="/Catálogo Vic Beauty.pdf" className="h-[15vh] w-[80%] xl:h-full xl:w-full flex flex-col xl:flex-row justify-center xl:items-center xl:gap-2 xl:row-span-1 xl:col-span-3">
                    <span className="text-white text-4xl text-left font-cinzel-decorative ml-[5%]">TÉCNICAS</span>
                    <span className="text-[#963c2d] text-4xl text-right font-cinzel mr-[5%]">E SERVIÇOS</span>
                </DefaultButton>
                <div
                    className="w-[80%] h-[15vh] flex xl:hidden items-center justify-center bg-no-repeat bg-center bg-cover group"
                    style={{ backgroundImage: `url(${bumper2})` }}
                >
                </div>
                <DefaultButton href="https://wa.me/+5567998188009" className="w-[80%] xl:w-full xl:h-full flex justify-center items-center p-4 xl:row-span-1 xl:col-span-3">
                    <span className="text-white text-2xl xl:text-4xl font-cinzel-decorative">AGENDAR</span>
                </DefaultButton>
                <DefaultButton href="https://maps.app.goo.gl/SDQxGT1TvCMJDUqc8" className="w-[80%] xl:hidden flex justify-center items-center p-4 xl:row-span-1 xl:col-span-3">
                    <span className="text-white text-2xl font-cinzel-decorative">Localização</span>
                </DefaultButton>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.4232609417954!2d-54.60209072371154!3d-20.48886815595676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486ef825e14bcab%3A0x896359a1af0cb74c!2sVic%20Beauty%20Studio!5e0!3m2!1spt-BR!2sbr!4v1772330434881!5m2!1spt-BR!2sbr"
                    style={{ border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="hidden xl:flex xl:h-full xl:w-full xl:row-span-2 xl:col-span-4 border-0 brightness-75 contrast-125 saturate-75"
                />
                <div
                    className="h-full w-full hidden xl:flex items-center justify-center bg-no-repeat bg-center bg-cover group xl:row-span-2 col-span-2"
                    style={{ backgroundImage: `url(${bumper2})` }}
                ></div>
            </div>
        </div>
    )
}