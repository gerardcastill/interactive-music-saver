import Music from "../../images/music.jpg";
import ticketIcon from "@heroicons/react/16/solid/esm/TicketIcon";
import clipboardDocumentListIcon from "@heroicons/react/16/solid/esm/ClipboardDocumentListIcon";
import magnifyingGlassIcon from "@heroicons/react/16/solid/esm/MagnifyingGlassIcon";

const cards = [
    {
        name: 'Search Shows',
        description: 'Keep an eye out for upcoming, local concerts and never miss a beat.',
        icon: magnifyingGlassIcon,
    },
    {
        name: 'Purchase Tickets',
        description: 'Dont fret! Snagging seats is a breeze with trusted vendor links to secure your spot and tap into the show.',
        icon: ticketIcon,
    },
    {
        name: 'Event Planner',
        description: 'Build a schedule to keep track of events and create your personalized set list.',
        icon: clipboardDocumentListIcon,
    },
]

export default function LandingPage() {
    return (

        <div className="absolute bg-white py-24 sm:py-32 w-full min-h-fit">
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="lg:flex-1">
                        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Concerto</h2>
                        <p className="mt-6 text-lg leading-8 text-black">
                            Concerto is an application that lets you save music events happening in
                            locations of your interest. You can cultivate a growing list of music events to help plan
                            future outgoings using the information provided by Ticketmaster.
                        </p>
                    </div>
                    <div className="lg:flex-1 mt-8 lg:mt-0">
                        <div className="flow-root">
                            <div
                                className="-m-2 rounded-xl p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <img
                                    alt="App screenshot"
                                    src={Music}
                                    width={2432}
                                    height={1442}
                                    className="max-h-80 w-auto mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-8">
                    {cards.map((card) => (
                        <div key={card.name}
                             className="flex gap-x-4 rounded-xl bg-white/10 p-6 ring-2 ring-inset ring-black">
                            <card.icon className="h-7 w-5 flex-none text-black" aria-hidden="true"/>
                            <div className="text-base leading-7">
                                <h3 className="font-semibold text-black">{card.name}</h3>
                                <p className="text-black">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}