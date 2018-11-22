# The "pipes" || = or. This is saying that if the board returns nil, return an empty array.  So, either display the current board, or a new one.
class TicTacToe
  def initialize(board = nil)
    @board = board || Array.new(9, " ")
  end
  
  WIN_COMBINATIONS = [
  [0,1,2], # Top row
  [3,4,5], # Middle row
  [6,7,8], # Lower row
  [0,3,6], # Left column
  [1,4,7], # Middle column
  [2,5,8], # Rigth column
  [0,4,8], # Left to Rigth diagonal
  [2,4,6] # Rigth to Left diagonal
  ]

  def display_board
  puts " #{@board[0]} | #{@board[1]} | #{@board[2]} "
  puts "-----------"
  puts " #{@board[3]} | #{@board[4]} | #{@board[5]} "
  puts "-----------"
  puts " #{@board[6]} | #{@board[7]} | #{@board[8]} "
  end
  
  def input_to_index(user_input)
  user_input.to_i - 1
  end

  def move(index, current_player)
    @board[index] = current_player
  end
  
  def position_taken?(index)
    if (@board[index] == " " || @board[index] == "" || @board[index] == nil)
      return false
    else
      return true
    end
  end
  
  def valid_move?(index)
    if !(position_taken?(index)) && index.between?(0, 8)
      true
    else
      false
    end
  end
  
  def turn_count
    move_counter = 0
    @board.each do |space|
      if space == "X" || space == "O"
        move_counter += 1
      end
    end
      return move_counter
  end
  
  def current_player
    if turn_count.even?
      return "X"
    else
      return "O"
    end
  end
  
  def turn
    puts "Please enter 1-9:"
    input = gets.strip
    index = input_to_index(input)
    if valid_move?(index)
      move(index, current_player)
      display_board
    else
      turn
    end
  end
  
  def won?
    WIN_COMBINATIONS.each do |win_combination|
      win_index_1 = win_combination[0]
      win_index_2 = win_combination[1]
      win_index_3 = win_combination[2]

      position_1 = @board[win_index_1]
      position_2 = @board[win_index_2]
      position_3 = @board[win_index_3]

      if position_1 == "X" && position_2 == "X" && position_3 == "X" || position_1 =="O" && position_2 == "O" && position_3 == "O"
        return win_combination
      end
    end
    else
      false
  end
  
  def full?
  !@board.any? { |x| x == " " }
  end
  
  def draw?
    if full? && !won?
      return true
    else
      return false
    end
  end

  def over?
    if full? || won? || draw?
      return true
    else 
      return false 
    end 
  end  

  def winner
    if winning_combination = won?
     @board[winning_combination.first]
    end
  end
  
  def play
    while !over?
      turn
    end
    if won?
      puts "Congratulations #{winner}!"
    elsif draw?
      puts "Cat's Game!"
    end
  end
end
