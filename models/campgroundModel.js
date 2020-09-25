var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Comment = require("./commentModel");
const mongoosePaginate = require("mongoose-paginate");
//Schema Setup
var CampgroundSchema = new Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	coordinates: Array,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

CampgroundSchema.pre('remove', async function () {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	})
});

CampgroundSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Campground", CampgroundSchema);