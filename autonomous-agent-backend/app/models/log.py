from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    function_id = Column(Integer, ForeignKey("functions.id"), nullable=True)
    inputs = Column(Text)
    outputs = Column(Text)
    errors = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())