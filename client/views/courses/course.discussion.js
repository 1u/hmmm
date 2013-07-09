//load template-content
Template.discussion.post = function() {
    //get all first-level posts 
    var posts = CourseDiscussions.find(
		{course_ID: Session.get('selected_course')},
        {parent_ID: null},
        {sort: {time_updated: -1, time_created: -1}}
    );
    var ordered_posts = [];    
    // loop over first-level post, search each post for comments, order by most recent
    posts.forEach(function (post){
        post['course_ID']  = display_coursename(post['course_ID']);
        ordered_posts.push(post);
        var comments = CourseDiscussions.find({parent_ID: post._id}, {sort: {time_created: -1}});
        comments.forEach(function (comment){
            ordered_posts.push(comment);
        });
    });
    //return array with proper order
    return ordered_posts;
};

Template.postDialog.showPostDialog = function () {
    return Session.get("showPostDialog");
};

Template.writePostDialog.events({
    'click input.add': function () {
        var timestamp = new Date();
        var user = Meteor.userId();
        var course = Session.get("selected_course");
        
        if(Session.get("postID")){
            CourseDiscussions.insert({
                "parent_ID":Session.get("postID"),
                "course_ID":course,
                "time_created":timestamp,
                "user_ID":user,
                "title":$("#post_title").val(),
                "text":$("#post_text").val()
            });
            CourseDiscussions.update(
                {_id:Session.get("postID")},
                {$set:{"time_updated":timestamp}}
            );
        }else{
            CourseDiscussions.insert({
                "course_ID":course,
                "time_created":timestamp,
                "time_updated":timestamp,
                "user_ID":user,
                "title":$("#post_title").val(),
                "text":$("#post_text").val()
            });
        }
        //reset session variables, hide dialog
        Session.set("showPostDialog", false);
        Session.set("postID", false);
    },
    //reset session variables, hide dialog
    'click input.cancel': function () {
        Session.set("showPostDialog", false);
        Session.set("postID", false);
    }
});

Template.discussion.events({
    //comment existing post
    'click input.answer': function (template) {
        Session.set("postID", this._id);      
        Session.set("showPostDialog", true);
    },
    //write new post
    'click input.write': function () {
        Session.set("showPostDialog", true);
    }
});