import React from 'react';

const PostRequestIframe = ({ id, token }) => {
    return (
        <div>
            <iframe
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                src={process.env.STREAMURL + `/` + id + `?_token=` + token}
            ></iframe>
        </div>
    );
};

export default PostRequestIframe;
