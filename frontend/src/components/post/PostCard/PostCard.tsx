import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryBadge } from '../../common/CategoryBadge';
import thumbnail from '../../../assets/images/ML_test-thumbnail.png';
import calendarIcon from '../../../assets/icons/ML_calendar-icon.png';
import commentIcon from '../../../assets/icons/ML_comment-icon.png';

import { PostType } from '../../../types/model';

const PostCard = ({ post }: { post: PostType }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${post.author.userId}/${post.postId}`);
    }

    return (
        <button className="rounded-10 shadow-lg h-92 cursor-pointer p-4" type="button" onClick={handleClick}>
            <div>
                {/* @TODO: 썸네일 실제 이미지 주소로 변경 */}
                <img src={thumbnail} alt="post thumbnails" className="w-full" />
            </div>
            <div>
                <div className="flex item-center justify-between">
                    <div className="flex item-center">
                        <img src={calendarIcon} alt="calendar" className="w-4 h-4 mr-2 " />
                        <span className="text-xs">{post.createdAt}</span>
                    </div>
                    <div className="mb-2">
                        <CategoryBadge categoryName={post.categoryName} />
                    </div>
                </div>
                <div className="my-2 text-left">
                    {post.title}
                </div>
                <div className="flex item-center">
                    <img src={commentIcon} alt="comment" className="w-4 h-4 mr-1" />
                    <span className="text-xs">{post.numOfComments}</span>
                </div>
            </div>
        </button>
    );
}

export default PostCard;
