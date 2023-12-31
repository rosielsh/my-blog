import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserProfileBox } from './components/UserProfileBox';
import { TabBar } from './components/TabBar';
import { Category } from './components/Category';
import { TabBarMenuType } from './components/TabBar/TabBar';
import { DropBox } from '../../components/common/DropBox';

const UserPage = () => {

    // @TODO: 본인 아이디 받아오기
    const userId = 'shlee';

    const tabBarMenus = [
        ['posts', '포스트'],
        ['guestbook', '방명록'],
        ['introduce', '한줄소개']
    ];

    const location = useLocation();
    const getCurrentTabUrl = (): string => {
        const path = location.pathname;

        let tab = '';
        for (let i = 0; i < tabBarMenus.length; i += 1) {
            const regex = new RegExp(tabBarMenus[i][0]);
            if (regex.test(path)) {
                [, tab] = tabBarMenus[i];
                break;
            }
        }

        return tab;
    }

    const tabBarMenu: TabBarMenuType[] = [
        {
            text: '포스트',
            link: 'posts',
        },
        {
            text: '방명록',
            link: 'guestbook',
        },
        {
            text: '한줄소개',
            link: 'introduce'
        }
    ]

    const [selecteTab, setSelectedTab] = useState<string>(getCurrentTabUrl());
    const navigate = useNavigate();

    const handleTabBar = (tab: TabBarMenuType) => {
        setSelectedTab(tab.text);
        navigate(`/${userId}/${tab.link}`);
    }

    const categoryList: string[] = [
        'Javascript',
        'React',
        '회고록',
        'Algorithm'
    ];

    const handleCategory = (category: string) => {
        // category가 선택됨
        navigate(`/${userId}/category/${category}`);
        setSelectedTab('포스트');
    }

    const viewOptionList = ['board', 'list'];

    const [selectedViewOption, setSelectedViewOption] = useState<string>('board');

    const handleViewOption = (option: string) => {
        setSelectedViewOption(option);
    }

    return (
        <div>
            <div className="absolute top-0 w-full h-48 bg-ml-pink-100 -z-10">&nbsp;</div>
            <div className="my-8 w-10/12 mx-auto">
                <div className="h-72 w-full">
                    <UserProfileBox />
                </div>
                <div className="h-10 border-b-[1px]">
                    <TabBar selectedTab={selecteTab} tabList={tabBarMenu} handleOption={handleTabBar} />
                </div>
                <div className="grid grid-cols-5 p-4">
                    <div className="col-span-1"><Category categoryList={categoryList} handleCategory={handleCategory} /></div>
                    <div className="col-span-4 min-h-96">
                        {
                            selecteTab === '포스트'
                            &&
                            <div>
                                <div className="h-10 float-right">
                                    <DropBox showText={selectedViewOption} menuList={viewOptionList} handleOption={handleViewOption} />
                                </div>
                            </div>
                        }
                        <Outlet /></div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
