import React, { useState } from 'react';
import profile from '../../assets/images/ML_test-profile.png';

const ManagePage = () => {

    type ContactValueType = 'Email' | 'GitHub' | 'LinkedIn' | 'WebSite';

    type ContactType = {
        type: ContactValueType,
        value: string
    }

    type UserType = {
        userId: string,
        nickName: string,
        content: string,
        createdAt: string,
        profileImage: string | null,
        contacts: ContactType[]
    }

    const [userInfo, setUserInfo] = useState<UserType>({
        userId: 'shlee',
        nickName: '춘장이',
        content: '개발을 잘하고 싶으요',
        createdAt: '2023-12-20T09:00:00Z',
        profileImage: null,
        contacts: [
            {
                type: 'Email',
                value: 'tnghk9611@naver.com'
            },
            {
                type: 'GitHub',
                value: 'rosielsh'
            },
        ]
    });

    type BlogType = {
        userId: string,
        blogName: string,
        content: string,
        createdAt: string
    }

    const [blogInfo, setBlogInfo] = useState<BlogType>({
        userId: 'shlee',
        blogName: 'myBlog',
        content: '개발자 지망생 임니당..',
        createdAt: '2023-12-20T09:00:00Z'
    });

    const [isClicked, setIsClicked] = useState({
        profile: false,
        blog: false,
        contact: false,
        category: false
    });

    type CategoryType = {
        categoryId: number,
        categoryName: string
    }

    type CategoryListType = CategoryType[];

    const [categoryList, setCategoryList] = useState<CategoryListType>([{
        categoryId: 3,
        categoryName: 'javascript'
    }, {
        categoryId: 2,
        categoryName: 'algorithm'
    }]);

    // 값이 수정될 때 호출되는 함수
    const changeModifyUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const changeModifyBlog = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    type ModifyPropertyType = 'profile' | 'blog' | 'contact' | 'category';

    const handleModify = (property: ModifyPropertyType, isModifyData: boolean) => {
        console.log(userInfo);

        // @TODO: 수정 데이터 통신
        if (isModifyData) {
            console.log('수정 통신 진행');
        }

        setIsClicked((prev) => {
            return {
                ...prev,
                [property]: !prev[property]
            }
        })
    }

    const handleCategory = (categoryId: number) => {
        const filteredCategory = categoryList.filter((category) => category.categoryId !== categoryId);

        setCategoryList([...filteredCategory]);
    }

    return (
        <div>
            <div className="absolute top-0 w-full h-60 bg-ml-pink-100 -z-10">&nbsp;</div>
            <div className="flex flex-col bg-white text-center w-[60%] m-auto mt-20 rounded-10 shadow-md p-5">
                {
                    isClicked.profile
                        ?
                        <button type="button" className="text-right text-sm pr-2 text-gray-700" onClick={() => handleModify('profile', true)}>
                            저장하기
                        </button>
                        :
                        <button type="button" className="text-right text-sm pr-2 text-gray-400 hover:text-gray-700" onClick={() => handleModify('profile', false)}>프로필 편집</button>
                }
                <div className="w-32 m-auto mb-4">
                    <img src={profile} alt="profile" />
                </div>
                {
                    isClicked.profile
                        ?
                        <input type="text" name='nickName' value={userInfo.nickName} className="border w-[80%] m-auto py-2 px-1 rounded-sm" onChange={changeModifyUser} />
                        :
                        <div className="text-2xl font-semibold">
                            {userInfo.nickName}
                        </div>
                }
                <div className="text-md">
                    {
                        isClicked.profile
                            ?
                            <input type="text" name='content' value={userInfo.content} className="border w-[80%] m-auto py-2 px-1 rounded-sm mt-1" onChange={changeModifyUser} />
                            :
                            <div className="text-md">
                                {userInfo.content}
                            </div>
                    }
                </div>
            </div>
            {/* 설정 탭 */}
            <div className=" w-[60%] m-auto mt-16 ">
                <div className="flex my-5">
                    <div className="basis-1/6">블로그명</div>
                    {
                        isClicked.blog
                            ?
                            <>
                                <input type="text" name='blogName' value={blogInfo.blogName} className="border w-[80%] m-auto rounded-sm p-1" onChange={changeModifyBlog} />
                                <button className="basis-1/6 text-sm text-gray-400 hover:text-gray-700" type="button" onClick={() => handleModify('blog', true)}>저장하기</button>
                            </>
                            :
                            <>
                                <div className="basis-2/3">{blogInfo.blogName}</div>
                                <button className="basis-1/6 text-sm text-gray-400 hover:text-gray-700" type="button" onClick={() => handleModify('blog', false)}>수정하기</button>
                            </>
                    }
                </div>
                <hr />
                <div className="flex my-5">
                    <div className="basis-1/6">연락처 정보</div>
                    <div className="basis-2/3">{userInfo.contacts.map((contact) => {
                        return <div key={contact.value}>{contact.value}</div>
                    })}</div>
                    <button className="basis-1/6 text-sm text-gray-400 hover:text-gray-700" type="button" onClick={() => handleModify('contact', false)}>수정하기</button>
                </div>
                <hr />
                <div className="flex my-5">
                    <div className="basis-1/6">카테고리 정보</div>
                    {
                        isClicked.category
                            ?
                            <>
                                <div className="basis-2/3">{categoryList.map((category) => {
                                    return <span className="text-white bg-gray-300 mx-1 px-3 py-1.5 rounded-10 hover:bg-gray-400" key={category.categoryId}>{category.categoryName}<button type="button" onClick={() => handleCategory(category.categoryId)}>&nbsp;x</button></span>
                                })}</div>
                                <button className="basis-1/6 text-sm text-gray-400 hover:text-gray-700" type="button" onClick={() => handleModify('category', true)}>저장하기</button>
                            </>
                            :
                            <>
                                <div className="basis-2/3">{categoryList.map((category) => {
                                    return <span className="text-white bg-gray-300 mx-1 px-3 py-1.5 rounded-10" key={category.categoryId}>{category.categoryName}</span>
                                })}</div>
                                <button className="basis-1/6 text-sm text-gray-400 hover:text-gray-700" type="button" onClick={() => handleModify('category', false)}>수정하기</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ManagePage;
