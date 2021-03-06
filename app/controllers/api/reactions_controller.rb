class Api::ReactionsController < ApplicationController
  before_action :require_logged_in

  def create
    @reaction = Reaction.new(reaction_params)

    if @reaction.save
      @review = Review.find(reaction_params[:review_id])

      render "api/reactions/show"
    else
      render json: @reaction.errors.full_messages, status: :unprocessable_entity
    end

  end

  def index
    @business = Business.find(params[:business_id])
    @review = @business.reviews.find(params[:review_id])
    @reactions = @review.reactions
    
    if @reactions
      render "api/reactions/index"
    end
  end

  def destroy
    @business = Business.find(params[:business_id])
    @review = @business.reviews.find(params[:review_id])

    @reaction = current_user.reactions.find(params[:id])

    if @reaction
      @reaction.destroy
      render "api/reactions/show"
    else
      render json: ['Unable to find reaction'], status: 422
    end
  end

  private
  def reaction_params
    params.require(:reaction).permit(:reaction_type, :review_id, :user_id)
  end
end