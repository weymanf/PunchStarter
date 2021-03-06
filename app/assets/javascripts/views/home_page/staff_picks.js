window.PunchStarter.Views.StaffPicks = Backbone.CompositeView.extend ({
	tagName: 'li',
	className: "page-view staff-picks",
	template: JST["home_page/staff_picks"],

	events: { "click .sp-category": "switchView"},

	initialize: function () {
		var _thisView = this;
		this.picks = new PunchStarter.Collections.Projects([], { extension: "staff_picks" });
		this.picks.fetch({
			success: function (projects) {
				_thisView.render(projects);
			}
		});
	},
	
	render: function (projects) {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		
		// default view, is switched with switchView anyhow.
		var view = this.getView("tech");
		this.$('.staff-change').html(gon.categories["tech"]);
		this.$('.staff-pick-project').html(view.render().$el);
		
		return this;
	},
	
	getView: function (category) {
		var targetProject = this.picks.find( function (model) {	return model._category === category; });
		
		return new PunchStarter.Views.FrontStaffView({ 
							model: targetProject, 
							category: category
						})
	},
	
	switchView: function (event) {
		event.preventDefault();
		var category = $(event.currentTarget).data('cat');
		var view = this.getView(category);
		var that = this;
		
		this.$('.staff-change').fadeOut("slow", function () {
			$(this).empty().promise().done(function() {
				that.$('.staff-change').html(gon.categories[category]).fadeIn();
			});
		});
		
		this.$('.staff-pick-project').fadeOut("slow", function () {
			$(this).empty().promise().done(function() {
				that.$('.staff-pick-project').html(view.render().$el).fadeIn();
			
				// Fixes problem where swapping DOM didn't lazyload new picture, but this seems out of place.
				$("img.lazy").lazyload({
					effect: "fadeIn"
				}).removeClass("lazy");
			});
		});
	}
});