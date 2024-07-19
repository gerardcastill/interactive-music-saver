import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import logo from "../../images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
    { name: 'Search Board', href: '/searchboard', icon: MagnifyingGlassIcon },
    { name: 'Favorites', href: '/favorites', icon: StarIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('/');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname]);

    const handleNavigate = (href) => {
        navigate(href);
        setCurrentPage(href);
    };

    return (
        <>
            <div className="max-w-64">
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                <div className="flex h-16 shrink-0 items-center">
                                    <button onClick={() => handleNavigate('/')} className="block">
                                        <img
                                            alt="Your Company"
                                            src={logo}
                                            className="h-8 w-auto"
                                        />
                                    </button>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigationItems.map((item) => (
                                                    <li key={item.name}>
                                                        <button
                                                            onClick={() => handleNavigate(item.href)}
                                                            className={classNames(
                                                                currentPage === item.href
                                                                    ? 'bg-black text-white'
                                                                    : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full text-left'
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    currentPage === item.href ? 'text-white' : 'text-gray-400 group-hover:text-white',
                                                                    'h-6 w-6 shrink-0'
                                                                )}
                                                            />
                                                            {item.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto flex justify-center">
                                            <button
                                                onClick={() => handleNavigate('/')}
                                                className="flex w-full items-center justify-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-black rounded-lg border border-black"
                                            >
                                                Go Back to Home Page
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <button onClick={() => handleNavigate('/')} className="block">
                                <img
                                    alt="Your Company"
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </button>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigationItems.map((item) => (
                                            <li key={item.name}>
                                                <button
                                                    onClick={() => handleNavigate(item.href)}
                                                    className={classNames(
                                                        currentPage === item.href
                                                            ? 'bg-black text-white'
                                                            : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full text-left'
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            currentPage === item.href ? 'text-white' : 'text-gray-400 group-hover:text-white',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                    />
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto flex justify-center">
                                    <button
                                        onClick={() => handleNavigate('/')}
                                        className="flex w-full items-center justify-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-black rounded-lg border border-black"
                                    >
                                        Go Back to Home Page
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>

                </div>

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">{/* Content */}</div>
                </main>
            </div>
        </>
    );
}
