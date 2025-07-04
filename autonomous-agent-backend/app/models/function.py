from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.types import JSON
from app.db.session import Base


class Function(Base):
    __tablename__ = "functions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    code = Column(Text)
    imports = Column(JSON, default=[])
    dependencies = Column(JSON, default=[])
    secret_keys = Column(JSON, default=[])